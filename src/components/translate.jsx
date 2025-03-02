export default function translate(translate_text){
    switch (translate_text){
        case "Sunny":
            return "Güneşli"
        case "Partly cloudy":
            return "Parçalı Bulutlu";
        case "Cloudy":
            return "Bulutlu";
        case "Patchy rain nearby":
            return "Yer yer yağmur olası";
        default:
            return condition;
    }
}
