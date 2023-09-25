<?php

namespace App\Http\Controllers;

use App\Models\Sendrequest;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    //getting the request for mess manager;
    public function requestManager(Request $req)
    {
        $existingRequest = Sendrequest::Where('email', $req->email)->first();
        if ($existingRequest) {
            return ['status' => 'exist'];
        } else {
            $requModel = new Sendrequest();
            $requModel->email = $req->email;
            $requModel->mess_name = $req->mess_name;
            $requModel->role_req = $req->role_req;
            $requModel->save();
            return ['status' => 'ok'];
        }
    }

    // Getting Individual User and their status;
    public function getReqUserById($email){
        $reqManager = Sendrequest::Where('email',$email)->first();
        if($reqManager){
            return $reqManager;
        }
        else{
            return ['status'=>'pending'];
        }
    }

    // Getting request status;
    public function getReqStatus($email){
        $reqManager = Sendrequest::Where('email',$email)->first();
        if($reqManager){
            return $reqManager;
        }
        else{
            return ['status'=>'null'];
        }
    }

}