def calculate_conf_mean(proba_list):
    mean_dict = {}
    n = len(proba_list)
    for proba_dict in proba_list:
        if proba_dict is not None:
            for k, v in proba_dict.items():
                mean_dict[k] = mean_dict.get(k, 0) + v * (1/n)
    if len(mean_dict) != 0:
        return sorted(mean_dict.items(), key=lambda x: x[1], reverse=True)[:3]
    else:
        return None

def detect_category(top_three_emos):
    if top_three_emos is not None:
        e1, e2, e3 = (e[0] for e in top_three_emos)
        if e1 == 'neutral':
            if e2 in ['surprise', 'sad']:
                if e3 in ['surprise', 'sad']:
                    return 'Confused'
                else:
                    return 'Satisfied'
            elif e2 == 'sad':
                if e3 == 'angry':
                    return 'Frustrated'
                else:
                    return 'Dissatisfied'
            elif e2 == 'happy':
                return 'Satisfied'
            elif e2 == 'angry':
                return 'Frustrated'
        elif e1 == 'happy' and e2 == 'neutral':
            return 'Satisfied'
        elif e1 == 'sad' and e2 == 'neutral':
            return 'Dissatisfied'
        elif e1 == 'angry' and e2 in ['sad', 'neutral'] and e3 in ['sad', 'neutral']:
            return 'Frustrated'
        else:
            return 'Distracted'
    else:
        return 'Distracted'

def predict_state(proba_list):
    return detect_category(calculate_conf_mean(proba_list))