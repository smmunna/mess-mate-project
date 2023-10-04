<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Login Method application;
    public function Login(Request $req)
    {
        $name = $req->name;
        $email = $req->email;
        $photo = $req->photo;
        $roles = $req->roles;

        $existingUser = User::Where('email', $email)->first();
        if ($existingUser) {
            // Nothing will happen
            return ['status' => 'exist'];
        } else {
            $user = new User();
            $user->name = $name;
            $user->email = $email;
            $user->photo = $photo;
            $user->roles = $roles;
            $user->save();

            return ['status' => 'ok'];
        }
    }

    // Get individual User;
    public function getUserByEmail($email){
        $user = User::Where('email',$email)->first();
        return $user;
    }


    // verify token for authentication;
   public function verifyToken(Request $request)
    {
        $user= User::where('email', $request->email)->first();
        // print_r($data);
            if (!$user) {
                return response([
                    'message' => ['These credentials do not match our records.']
                ], 404);
            }
        
             $token = $user->createToken('my-app-token')->plainTextToken;
        
            $response = [
                'user' => $user,
                'token' => $token
            ];
        
             return response($response, 201);
    }


    // Default error Route;
    public function errorRoute(){
        return  view('error');
    }

}