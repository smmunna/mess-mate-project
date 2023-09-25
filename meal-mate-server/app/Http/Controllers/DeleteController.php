<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Dailybazar;
use App\Models\Dailymeal;
use App\Models\Member;
use App\Models\Sendrequest;
use Illuminate\Http\Request;

class DeleteController extends Controller
{
    //delete all data for specific user;
    public function deleteAlldata(Request $req)
    {
        $manager_email = $req->input('manager_email');
        Dailybazar::where('manager_email', $manager_email)->delete();
        Balance::where('manager_email', $manager_email)->delete();
        Dailymeal::where('manager_email', $manager_email)->delete();
        Member::where('manager_email', $manager_email)->delete();
        Sendrequest::where('email', $manager_email)->delete();

        return ['status' => 'ok'];
    }
}