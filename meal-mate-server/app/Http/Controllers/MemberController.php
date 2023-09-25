<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    //get all members by their managerID;
    public function getMember($email)
    {
        $member = Member::Where('manager_email', $email)->get();
        return $member;
    }
    //get all members by their own ID;
    public function getMemberDetails($id)
    {
        $member = Member::Where('id', $id)->get();
        return $member;
    }

    // Add member to Member Table;
    public function addMember(Request $req)
    {
        $member = new Member();
        $member->name = $req->name;
        $member->email = $req->email;
        $member->phone = $req->phone;
        $member->mess_name = $req->mess_name;
        $member->manager_email = $req->manager_email;
        $member->save();
        return ['status' => 'ok'];
    }

    // Update Member to Member Table;
    public function updateMember(Request $req, $id)
    {
        $member = Member::Where('id', $id)->first();
        $member->name = $req->name;
        $member->email = $req->email;
        $member->phone = $req->phone;
        $member->save();
        return ['status' => 'ok'];
    }

    // Delete Member from Member Table;
    public function deleteMember($id){
        $member = Member::Where('id',$id)->delete();
        return ['status'=>'ok'];
    }
}