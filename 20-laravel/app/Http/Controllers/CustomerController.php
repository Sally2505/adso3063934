<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Pet;
use App\Models\Adoption;
use Illuminate\Support\Facades\Auth;



use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //My profile
    public function myprofile() {
        $user = User::find(Auth::user()->id);
        // dd(user->toArray());
        return view('customer.myprofile')->with('user', $user);

    }
    public function updatemyprofile(Request $request) {

    }
    public function myadoptions() {
        $adopts = adoption::where('user_id', Auth::user()->id)->get();
        return view('customer.myadoptions')->with('adopts', $adopts);
    }
    public function showadoption(Request $request) {
        
    }
    public function listpets() {
        return "Make adoption";
    }
    public function confirmadoption(Request $request) {

    }
    public function makeadoption(Request $request) {

    }
    public function search(Request $request) {

    }
}
