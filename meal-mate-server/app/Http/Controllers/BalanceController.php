<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Member;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    //add Balance to the Balance Table;
    public function addBalance(Request $req)
    {
        $existBalance = Balance::where('member_id', $req->member_id)->first();
        if ($existBalance) {
            return ['status' => 'exist'];
        } else {
            $balance = new Balance();
            $balance->member_id = $req->member_id;
            $balance->name = $req->name;
            $balance->amount = $req->amount;
            $balance->manager_email = $req->manager_email;
            $balance->save();
            return ['status' => 'ok'];
        }
    }

    //viewing the balances by joining Balance table and Member table;
    public function showBalance($email)
    {
        $user_balances = Balance::where('manager_email', $email)->get();
        return $user_balances;
    }

    // Update Balance;
    public function updateBalance(Request $req, $id)
    {
        $balance = Balance::where('id', $id)->first();
        $balance->amount = $req->amount;
        $balance->save();
        return ['status' => 'ok'];
    }

}