<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->paginate(20);
        return view('users.index')->with('users', $users);
    }

    public function create()
    {
        return view('users.create');
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'document' => ['required', 'numeric', 'unique:' . User::class],
            'fullname' => ['required', 'string'],
            'gender' => ['required'],
            'birthdate' => ['required', 'date'],
            'photo' => ['required', 'image'],
            'phone' => ['required', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'unique:' . User::class],
            'password' => ['required', 'confirmed'],
        ]);

        $photo = null;

        if ($request->hasFile('photo')) {
            $photo = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('images'), $photo);
        }

        $user = new User;
        $user->document = $request->document;
        $user->fullname = $request->fullname;
        $user->gender = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->photo = $photo;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        if ($user->save()) {
            return redirect('users')->with('message', 'The user: ' . $user->fullname . ' was successfully added!');
        }
    }

    public function show(User $user)
    {
        return view('users.show')->with('user', $user);
    }

    public function edit(User $user)
    {
        return view('users.edit')->with('user', $user);
    }

    public function update(Request $request, User $user)
    { {
            //
            $validated = $request->validate([
                'document'  => ['required', 'numeric', 'unique:' . User::class . ',document,' . $request->id],
                'fullname'  => ['required', 'string'],
                'gender'    => ['required'],
                'birthdate' => ['required', 'date'],
                'phone'     => ['required'],
                'email'     => ['required', 'lowercase', 'email', 'unique:' . User::class . ',email,' . $request->id],
            ]);

            if ($validated) {
                //dd($request->all());
                if ($request->hasFile('photo')) {
                    $photo = time() . '.' . $request->photo->extension();
                    $request->photo->move(public_path('images'), $photo);
                    if ($request->originphoto != 'no-photo.png') {
                        unlink(public_path('images/') . $request->originphoto);
                    }
                } else {
                    $photo = $request->originphoto;
                }

                $user->document  = $request->document;
                $user->fullname  = $request->fullname;
                $user->gender    = $request->gender;
                $user->birthdate = $request->birthdate;
                $user->photo     = $photo;
                $user->phone     = $request->phone;
                $user->email     = $request->email;

                if ($user->save()) {
                    return redirect('users')->with('message', 'The user: ' . $user->fullname . ' was successfully edited!');
                }
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        
        if($user->delete()) {
            if($user->photo != 'no-photo.png') {
                unlink(public_path('images/').$user->photo);
            }
            return redirect('users')->with('message', 'The user: '.$user->fullname.' was successfully deleted!');
        }
    }

    public function search(Request $request)
    {
        $users = User::names($request->q)->paginate(10);
        return view('users.search')->with('users', $users);
    }
}
