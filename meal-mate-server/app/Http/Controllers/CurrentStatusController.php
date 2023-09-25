<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Dailybazar;
use App\Models\Dailymeal;
use Illuminate\Http\Request;

class CurrentStatusController extends Controller
{
    //getting current balances from table;
    public function getBalances(Request $req)
    {
        $manager_email = $req->query('manager_email');
        $getBalance = Balance::where('manager_email', $manager_email)->get();
        return $getBalance;
    }

    // Getting the bazar from this table;
    public function getBazarCost(Request $req)
    {
        $manager_email = $req->query('manager_email');
        $getBalance = Dailybazar::where('manager_email', $manager_email)->get();
        return $getBalance;
    }

    // Getting the bazar from this table;
    public function getTotalMeal(Request $req)
    {
        $manager_email = $req->query('manager_email');
        $getBalance = Dailymeal::where('manager_email', $manager_email)->get();
        return $getBalance;
    }

    // calcultaing the total mealNumebr for individual member based on their id; 
    //joining the 2 tables and then sum the meal Number;
    public function getTotalMealForMember(Request $req)
    {
        $manager_email = $req->query('manager_email');

        $data = Dailymeal::join('balances', 'dailymeals.member_id', '=', 'balances.member_id')
            ->select('dailymeals.member_id')
            ->selectRaw('GROUP_CONCAT(DISTINCT dailymeals.name ORDER BY dailymeals.name ASC SEPARATOR \', \') as names')
            ->selectRaw('SUM(dailymeals.mealNumber) as mealNumber')
            ->selectRaw('MAX(balances.amount) as amount') // Include the 'amount' column from the 'balances' table
            ->where('dailymeals.manager_email', $manager_email)
            ->groupBy('dailymeals.member_id') // Group by only 'dailymeals.member_id'
            ->get();

        return $data;
    }


}