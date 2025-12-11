<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Adoption;
use App\Models\Pet;





class CustomerController extends Controller
{
    // ============================================
    //  MY PROFILE
    // ============================================
    public function myprofile()
    {
        $user = Auth::user();
        return view('customer.myprofile', compact('user'));
    }

    // ============================================
    //  UPDATE PROFILE
    // ============================================
    public function updatemyprofile(Request $request)
    {
        $user = Auth::user();

        // VALIDACIONES
        $request->validate([
            'document' => 'required|numeric|unique:users,document,' . $user->id,
            'fullname' => 'required|string',
            'gender' => 'required',
            'birthdate' => 'required|date',
            'phone' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        // FOTO ACTUAL
        $photo = $user->photo;

        // SI SUBE UNA FOTO NUEVA
        if ($request->hasFile('photo')) {

            // SUBIR NUEVA
            $photo = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('images'), $photo);

            // ELIMINAR ANTERIOR SI NO ES DEFAULT
            if ($user->photo && $user->photo != 'no-photo.png') {
                $oldPath = public_path('images/' . $user->photo);
                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }
        }

        // ACTUALIZAR DATOS
        $user->update([
            'document'  => $request->document,
            'fullname'  => $request->fullname,
            'gender'    => $request->gender,
            'birthdate' => $request->birthdate,
            'phone'     => $request->phone,
            'email'     => $request->email,
            'photo'     => $photo,
        ]);

        // REDIRECCIÓN
        return redirect('dashboard')
            ->with('message', 'My profile was successfully edited.');
    }


    // My ADOPTIONS
    public function myadoptions()
    {
        $adopts = Adoption::where('user_id', Auth::user()->id)->get();
        return view('customer.myadoptions')->with('adoptions', $adopts);
    }

    public function showadoption(Request $request)
    {
        $adopt = Adoption::find($request->id);
        return view('customer.showadoption')->with('adoption', $adopt);
    }
    public function listpets()
    {
        $pets = Pet::where('status', 0)->paginate(20);
        return view('customer.makeadoption')->with('pets', $pets);
    }


    public function confirmadoption($id)
    {
        $pet = Pet::findOrFail($id);
        return view('customer.adoptions.confirm', compact('pet'));
    }

    public function makeadoption(Request $request)
    {
        Adoption::create([
            'user_id' => Auth::id(),
            'pet_id'  => $request->pet_id
        ]);

        // Marcar la mascota como adoptada
        Pet::where('id', $request->pet_id)->update(['status' => 1]);

        return redirect('myadoptions')
            ->with('message', '✅ Adoption successful! Thank you for giving a loving home. 🐾❤️');
    }
    public function search(Request $request)
    {
        $q = $request->q;

        $pets = Pet::where(function ($query) use ($q) {
            $query->where('name', 'like', "%$q%")
                ->orWhere('kind', 'like', "%$q%")
                ->orWhere('breed', 'like', "%$q%");
        })
            ->where('status', 0)
            ->orderBy('id', 'desc')
            ->paginate(20);

        return view('customer.search', compact('pets'));
    }
}
