package model;

import java.util.ArrayList;
import java.util.List;

public class Results {
    private List<Hit> hitList;

    public Results() {
        this.hitList = new ArrayList<>();
    }

    public List<Hit> getHitList() {
        return hitList;
    }

    public Results(List<Hit> hitList) {
        this.hitList = hitList;
    }

    public void setHitList(List<Hit> hitList) {
        this.hitList = hitList;
    }

    public String toJson() {
        List<Hit> hits = hitList;
        if (hits.isEmpty())
            return "[]";
        String jsonArray = "[";
        for (Hit hit:hits) {
            jsonArray += hit.toJson();
            jsonArray += ",";
        }
        jsonArray = jsonArray.substring(0, jsonArray.length() - 1);
        jsonArray += "]";
        return jsonArray;
    }
}
