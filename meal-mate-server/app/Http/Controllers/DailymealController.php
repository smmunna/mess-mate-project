<?php

namespace App\Http\Controllers;

use App\Models\Dailymeal;
use Illuminate\Http\Request;

class DailymealController extends Controller
{
    //daily meals data save to database;
    public function saveDailyMealData(Request $req)
    {
        $mealData = $req->input('data');
        $date = $req->input('date');

        $exist = Dailymeal::where('date', $date)->first();
        if ($exist) {
            return ['status' => 'exist'];
        } else {
            foreach ($mealData as $meal) {
                Dailymeal::create($meal);
            }
            return ['status' => 'ok'];
        }



    }

    // daily meals status specific data with date ;
    public function getMealStatus(Request $req)
    {
        $email = $req->query('email');
        $date = $req->query('date');

        $filteredData = Dailymeal::where('manager_email', $email)
            ->whereDate('date', $date)
            ->get();

        return $filteredData;
    }

    // Update Meal Number;
    public function updateMealNumber(Request $req, $id)
    {
        $mealNumber = $req->input('mealNumber');
        $updateMealNumber = Dailymeal::where('id', $id)->first();
        $updateMealNumber->mealNumber = $mealNumber;
        $updateMealNumber->save();
        return ['status' => 'ok'];
    }
}