<?php

namespace App\Http\Controllers;

use App\Models\Dailybazar;
use Illuminate\Http\Request;

class DailybazarController extends Controller
{
    //save daily bazar Data;
    public function saveDailyBazar(Request $req)
    {
        $name = $req->input('name');
        $cost = $req->input('cost');
        $date = $req->input('date');
        $manager_email = $req->input('manager_email');

        $dailybazar = new Dailybazar();
        $dailybazar->name = $name;
        $dailybazar->cost = $cost;
        $dailybazar->date = $date;
        $dailybazar->manager_email = $manager_email;
        $dailybazar->save();

        return ['status' => 'ok'];
    }

    // Showing the daily Bazar Details;
    public function showDailyBazar(Request $req)
    {
        $manager_email = $req->query('manager_email');
        $dailyBazar = Dailybazar::where('manager_email', $manager_email)->get();
        return $dailyBazar;
    }

    // Update the bazar amount;
    public function updateDailyBazar(Request $req)
    {
        $amount = $req->input('amount');
        $id = $req->query('id');
        $dailyBazar = Dailybazar::where('id', $id)->first();
        $dailyBazar->cost = $amount;
        $dailyBazar->save();

        return ['status' => 'ok'];
    }

    
}