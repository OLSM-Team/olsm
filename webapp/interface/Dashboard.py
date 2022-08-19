from dash import Dash, html, dcc, dash_table
from flask import session

import plotly.express as px
import plotly.io as pio

import dash_bootstrap_components as dbc
import plotly.graph_objects as go
from dash.dependencies import Input, Output

import pandas as pd
from collections import OrderedDict

from utils.db import *
from utils import get_date, get_time

##################### Colors #################

pallete = {
        'Satisfied': '#FFDEDE',
        'Dissatisfied': '#F2D7D9',
        'Frustrated': '#D3CEDF',
        'Confused': '#9CB4CC',
        'Distracted': '#748DA6',
        'Out': '#EB4747',
        'Other': '#467495',
        'Cards': '#7290B5',
        'background': '#EEEEEE', 
        'Header': '#1752A4',
        'Sat':'#FF8FB1',
        'Dissat':'#D75281',
        'Fru':'#AE69FA'
}

##################### Globals #################
topics = []
start = []
end = []

lec_id = ""
lec_df = pd.DataFrame()
Emotions = ['Satisfied', 'Dissatisfied', 'Frustrated', 'Confused', 'Distracted']

#################### Functions ###############

def get_count_per_subtopic(ch_start, ch_end):
    states = get_subtopic(lec_id, ch_start, ch_end)
    counts = OrderedDict(Satisfied = 0, Dissatisfied = 0, Frustrated = 0, Confused = 0, Distracted = 0)
    for dict_ in states:
        counts[dict_["state"]] = dict_["count"]
    return [v for v in counts.values()]

def table_data(ids, ch_start, ch_end):
    alist = []
    student_states = get_students_subtopic(lec_id, ch_start, ch_end)
    for id in ids:
        for student in student_states:
            if student["student"] == id:
                alist.append(student["state"])
                break
        else:
            alist.append("Out")
    return alist

def discrete_background_color_bins(df):   
    df_columns = df.select_dtypes('object')
    
    styles=[
        {
            'if': {
                'column_id': 'Student id'
            },
            'backgroundColor': "#FAFAFA",
            'color': 'Black', 
            'height': '45px', 
            'width': '80px'
        }
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Out'.format(col=col),
            },
            'backgroundColor': pallete['Out'],
            'color': 'white', 
            'height': '45px'
        }for col in df_columns
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Satisfied'.format(col=col),
            },
            'backgroundColor': pallete['Satisfied'],
            'color': 'black', 
            'height': '45px'
        }for col in df_columns
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Dissatisfied'.format(col=col),
            },
            'backgroundColor': pallete['Dissatisfied'],
            'color': 'black', 
            'height': '45px'
        } for col in df_columns
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Frustrated'.format(col=col),
            },
            'backgroundColor': pallete['Frustrated'],
            'color': 'black', 
            'height': '45px'
        } for col in df_columns
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Confused'.format(col=col),
            },
            'backgroundColor': pallete['Confused'],
            'color': 'white', 
            'height': '45px'
        } for col in df_columns
    ] + [
        {
            'if': {
                'column_id': col,
                'filter_query': '{{{col}}} = Distracted'.format(col=col),
            },
            'backgroundColor': pallete['Distracted'],
            'color': 'white', 
            'height': '45px'
        } for col in df_columns
    ]   
    
    return styles

def init_dashboard(server):
    dash_app = Dash(server=server, routes_pathname_prefix="/dash/",
        assets_folder='./assets/', external_stylesheets=[dbc.themes.BOOTSTRAP])
    
    def serve_layout(id):
        
        ##################### Data ##################
        global lec_id, topics, start, end, lec_df

        lec_id = id
        lec_df = get_lecture(lec_id)

        topics = []
        start = []
        end = []
        for subtopic in lec_df['subtopics']:
            topics.append(subtopic['title'])
            start.append(int(subtopic['from']))
            end.append(int(subtopic['to']))

        subtopics = pd.DataFrame(topics, columns=['topic'])
        


        #################### Cards(Bans) #################
        Satisfied = html.Div([
            html.Div([
                html.Div([
                dbc.CardImg(src="assets\Satisfied_emoji.webp", style={"margin-top": "15px", "width": "60px", 'margin-left':'15px'}),

            ], className='col-4'),
            html.Div([
                html.H4(f"Satisfied",
                        style={'color':'black', 'font-weight': 'bold', 'text-align': 'center'}),
                
                html.H4(0, style={'text-align': 'center'}, id="card-satisfied")
                
            ], className='p-2 col-8')
            ], className='row')
            
        ], className='col-2 m-2 p-2 rounded', style={'background-color': pallete['Satisfied']})


        Dissatisfied = html.Div([
            html.Div([
                html.Div([
                dbc.CardImg(src="assets\Dissatisfied_emoji.webp", style={"margin-top": "15px", "width": "60px", 'margin-left':'15px'}),

            ], className='col-4'),
            html.Div([
                html.H4(f"Dissatisfied",
                        style={'color':'black', 'font-weight': 'bold', 'text-align': 'center'}),
                
                html.H4(0, style={'text-align': 'center'}, id="card-dissatisfied")
                
            ], className='p-2 col-8')
            ], className='row')
            
        ], className='col-2 m-2 p-2 rounded', style={'background-color': pallete['Dissatisfied']})

        Frustrated = html.Div([
            html.Div([
                html.Div([
                dbc.CardImg(src="assets\Frustrate_emoji.webp", style={"margin-top": "10px", "width": "60px", 'margin-left':'15px'}),

            ], className='col-4'),
            html.Div([
                html.H4(f"Frustrated",
                        style={'color':'black', 'font-weight': 'bold', 'text-align': 'center'}),
                
                html.H4(0, style={'text-align': 'center'}, id="card-frustrated")
                
            ], className='p-2 col-8')
            ], className='row')
            
        ], className='col-2 m-2 p-2 rounded', style={'background-color': pallete['Frustrated']})

        Confused = html.Div([
            html.Div([
                html.Div([
                dbc.CardImg(src="assets\Confused_emoji.webp", style={"margin-top": "15px", "width": "60px", 'margin-left':'15px'}),

            ], className='col-4'),
            html.Div([
                html.H4(f"Confused",
                        style={'color':'black', 'font-weight': 'bold', 'text-align': 'center'}),
                
                html.H4(0, style={'text-align': 'center'}, id="card-confused")
                
            ], className='p-2 col-8')
            ], className='row')
            
        ], className='col-2 m-2 p-2 rounded', style={'background-color': pallete['Confused']})

        Distracted = html.Div([
            html.Div([
                html.Div([
                dbc.CardImg(src="assets\Distracted_Emoji.webp", style={"margin-top": "15px", "width": "60px", 'margin-left':'15px'}),

            ], className='col-4'),
            html.Div([
                html.H4(f"Distracted",
                        style={'color':'black', 'font-weight': 'bold', 'text-align': 'center'}),
                
                html.H4(0, style={'text-align': 'center'}, id="card-distracted")
                
            ], className='p-2 col-8')
            ], className='row')
            
        ], className='col-2 m-2 p-2 rounded', style={'background-color': pallete['Distracted']})

        #################### Dashboard Layout #################

        dash_layout = html.Div(
            [   
                ##################_Header_###############
                dbc.Row([
                    dbc.Col(
                        html.Img(src=dash_app.get_asset_url("student-engagement.JPG"), 
                        style={'hieght': '110%', 'width': '110%', 'padding':'10px'}), width=1
                    ),
                    dbc.Col(
                        html.H1("Online Learning System Monitoring",
                                className="text-light pt-3",
                                #style={'font-size':'320%', 'font-family':'Calibri Light', 'color':'white', "text-align": "left", 'padding':'24px'}
                            ) 
                    ),

            ],style={'backgroundColor': pallete['Header']}),

                ##################_LecInfo_###############
                html.Div([
                    html.Div([
                        html.H5(f'Lecture Title: {lec_df["title"]}', style={'margin-top': '5px', 'text-align': 'center'}), 
                    ], className='col-4'),

                    html.Div([
                        dbc.Row([
                            dbc.Col(html.H5("Topics : ", style={'margin-top': '5px'}), width=2),
                            dbc.Col(dbc.ListGroup(
                        [
                            dbc.ListGroupItem(item, className='me-1') for item in topics
                        ], horizontal=True),)
                        ])    
                    ], className='col-5'),

                    html.Div([
                        html.H5(f'Start Time: {get_time(lec_df["start"])} On {get_date(lec_df["start"])}', style={'margin-top': '5px', 'text-align': 'center'}), 
                    ], className='col-3'),
                    
                    ],
                    className='row d-flex p-3',
                    style={'background-color': '#3197f35c'}
                    ),

                ##############_BANS_##############
                html.Div([
                    dcc.Interval(id='card-interval', interval=15*1000),
                    html.Div([
                        Satisfied,
                        Dissatisfied,
                        Frustrated,
                        Confused,
                        Distracted
                ], className='row d-flex justify-content-center')
                    
                ], className="mb-4",  style={'margin-top':'25px'}),
                

                ##############_OverallFig_################
                dbc.Row(
                    [
                        dbc.Col(html.Div(dcc.Graph(id='real-time-graph'),
                                        style={"border-width":"1px",  "border-color":pallete['Cards'], "border-style":"solid"},
                                        className='rounded-3 shadow p-1'), width=7),
                        dcc.Interval(id="real-time-interval", interval=30*1000),
                        dbc.Col(html.Div(
                            [
                                html.H5('Action Recommendation Based on Student Status', 
                                    style={'text-align':'center', 'margin':'0px', 'backgroundColor':'white', "padding-top":"12px"}),
                                dcc.Graph(id="recommendation-graph")
                            ],
                            style={"border-width":"1px",  "border-color":pallete['Cards'], "border-style":"solid"},
                            className='rounded-3 shadow p-1'), width=5)
                    ],
                    style={'margin-top':'25px'}
                ),
                
                #############_SubtopicsFig_##############
                dbc.Row(
                    [
                        dbc.Col(
                            html.Div([
                                html.H5('Lecture Subtopics Report', style={'text-align':'center', 'margin':'12px'}),
                                dash_table.DataTable(
                                    sort_action='native',
                                    style_header={'height':'45px'},
                                    style_cell={'textAlign': 'center'},
                                    style_table={'height': '450px', 'overflowY': 'auto'},
                                    id="subtopics-table")
                            ],
                            style={"border-width":"1px",  "border-color":pallete['Cards'], "border-style":"solid"},
                            className='rounded-3 shadow p-1'
                            ), width=7
                        ),
                        
                        dbc.Col(
                            html.Div([
                                dbc.Row([
                                        dbc.Col(html.Label(['Subtopic'], style={'font-weight': 'bold',"text-align": "left"}), width=1),
                                        dbc.Col(dcc.Dropdown(id='myDropdown',
                                                    options=[{'label': str(topic), 'value': str(topic)}
                                                    for topic in subtopics['topic']], 
                                                    value=subtopics['topic'][0], multi=False
                                        ), style={'margin-left':'50px'}, width=5)
                                        ], style={'background':'#ffffff', 'padding':'6px', 'margin':'0px'}),

                                dbc.Row(html.Div(dcc.Graph(id='Sub_topics_fig'))),
                                dcc.Interval(id='subtopics-interval', interval=15*60*1000)
                                ],
                                style={"border-width":"1px",  "border-color":pallete['Cards'], "border-style":"solid"},
                                className='rounded-3 shadow p-1'
                            ), width=5
                        ),
                    ], style={'margin-top':'25px'}
                ),

            ],
            className='container-fluid',
            style={'backgroundColor':pallete['background'], 'margin':'0px', 'padding':'12px', 'padding-top':'0px'}
        )

        return dash_layout

    #################### Callbacks #################

    @dash_app.callback(
        Output('card-satisfied', 'children'),
        Output('card-dissatisfied', 'children'),
        Output('card-frustrated', 'children'),
        Output('card-confused', 'children'),
        Output('card-distracted', 'children'),
        Input('card-interval', 'n_intervals')
    )
    def update_bans(n):
        current_states = get_current_states(lec_id)
        counts = dict(Satisfied = 0, Dissatisfied = 0, Frustrated = 0, Confused = 0, Distracted = 0)
        if current_states is not None:
            for dict_ in current_states:
                counts[dict_["state"]] = dict_["count"]
        return counts['Satisfied'], counts['Dissatisfied'], counts['Frustrated'], counts['Confused'], counts['Distracted']


    @dash_app.callback(
        Output('real-time-graph', 'figure'),
        Output('recommendation-graph', 'figure'),
        Input('real-time-interval', 'n_intervals')
    )
    def update_real_time(n):

        #### 1- Real Time Monitoring (First Graph) 
        list_ = get_real_time(lec_id)
        df = pd.DataFrame(list_)
        if df.shape[0] == 0:
            df = pd.DataFrame({"chunk": [], "count": [], "state": []})

        line_graph = px.line(df, x="chunk", y='count', labels={"count": "Student Count", "chunk": "Chunk ID"}, 
                                markers=True, color='state',
                                color_discrete_map={
                                        "Satisfied": pallete['Sat'],
                                        "Dissatisfied": pallete['Dissat'],
                                        "Frustrated": pallete['Fru'],
                                        "Confused": pallete['Distracted'],
                                        "Distracted": pallete['Header']
                                        })
        line_graph.update_layout(title={'text': "Real Time Monitoring", 'y':0.95, 'x':0.5},
                                legend=dict(yanchor="top", y=0.92, xanchor="left", x=0.05),
                                yaxis={"range":[0, df['count'].max()+1]}, plot_bgcolor = pallete['background'], height=485);


        #### 2- Action Recommendation Based on Student Status (Second Graph) 
        if len(lec_df) == 0 or lec_df['status']==1:
            break_percentage = engagement_percentage = 0
        else:
            ch_start = ch_end = 0

            ########### For Example :
            ch = get_current_chunk(lec_id)

            for subtopic in lec_df['subtopics']:
                if ch is not None and int(subtopic['from']) <= ch and int(subtopic['to']) >= ch:
                    ch_start = int(subtopic['from'])
                    ch_end = int(subtopic['to'])
                    break
            
            emotion_count = get_count_per_subtopic(ch_start, ch_end)

            break_indicator = emotion_count[1] + emotion_count[2]
            All_count = sum(emotion_count)
            break_percentage = round(((break_indicator / (All_count))*100), 2) if All_count else 00.00

            engagement_indicator = emotion_count[3] + emotion_count[4]
            engagement_percentage = round(((engagement_indicator / (All_count))*100), 2) if All_count else 00.00

        Recommendation_fig = go.Figure()

        Recommendation_fig.add_trace(go.Indicator(
            mode = "number+gauge",
            value = break_percentage ,
            number= {'suffix':'%'},
            title = {'text': "Break Indicator"},
            gauge = {'axis': {'range': [None, 100]}, 'bar': {'color': pallete['Other']}},
            domain = {'x': [0, 1], 'y': [0.4, 1]}))

        Recommendation_fig.add_trace(go.Indicator(
            mode = "number+gauge",
            value = engagement_percentage,
            number= {'suffix':'%'},
            gauge = {'shape': "bullet", 'axis': {'range': [None, 100]}, 'bar': {'color': pallete['Other']}},
            domain = {'x': [0.18, 1], 'y': [0, 0.15]}))

        Recommendation_fig.update_layout(title = {'text': "Disengagement Indicator", 'y':0.3, 'x':0.5});

        return line_graph, Recommendation_fig

    @dash_app.callback(
        Output(component_id='Sub_topics_fig', component_property='figure'),
        Output('subtopics-table', 'data'),
        Output('subtopics-table', 'columns'),
        Output('subtopics-table', 'style_data_conditional'),
        Input(component_id='myDropdown', component_property='value'),
        Input('subtopics-interval', 'n_intervals')
    )
    def update_my_fig(subtopic, n):


    #### 3- Lecture Subtopics Report (Tabel) 

        ids = sorted(get_students_ids(lec_id))

        topics_table = []
        current_chunk = get_current_chunk(lec_id)
        for i in range(len(topics)):
            if current_chunk is not None and current_chunk < start[i]:
                topics_table.append([None] * len(topics_table[-1]))
            topics_table.append(table_data(ids, start[i], end[i]))

        data = OrderedDict(
            [
                ("Student id", ids)
            ]
        )

        for i in range(len(topics)):
            data.update({topics[i]:topics_table[i]})
        df = pd.DataFrame(data)
        styles = discrete_background_color_bins(df)

    #### 4- Lecture Subtopics Figure (Last Graph)
        Count = []
        index = topics.index(subtopic)
        Count = get_count_per_subtopic(start[index], end[index])

        Sub_topics_fig = px.bar(
                            x=Emotions, y=Count,
                            labels={"x": "Emotions", "y": "Student Count"},
                            text_auto=True, color=Emotions,
                            color_discrete_map={
                                    'Satisfied': pallete['Satisfied'],
                                    'Dissatisfied': pallete['Dissatisfied'],
                                    'Frustrated' : pallete['Frustrated'],
                                    'Confused': pallete['Confused'],
                                    'Distracted': pallete['Distracted']
                                    }, template="simple_white"
                        )
        Sub_topics_fig.update_layout(title={'text': "Lecture Subtopics Figure", 'y':0.95, 'x':0.5});

        return Sub_topics_fig, df.to_dict("records"), [{'name': i, 'id': i} for i in df.columns], styles

    @dash_app.callback(
        Output('page-content', 'children'),
        Input('url', 'pathname')
    )
    def display_dash(pathname):
        if "email" in session and "dash" in session:
            id = int(session["dash"].split('%3&')[1])
            return serve_layout(id)
        else:
            return html.Div([
                html.H1("You need to be login!"),
                dbc.Button("Login Here", href="https://olsm.ddns.net/login", className="btn-link", style={"color": "white", "text-decoration": "none"})
            ], style={"width": "100%", "margin": "auto", "textAlign": "center", "height": "auto", "margin-top": "20%"})

    dash_app.layout = html.Div([
        dcc.Location(id='url', refresh=False),
        html.Div(id="page-content")
    ])

    return dash_app.server