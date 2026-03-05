<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * Maneja el inicio de sesión y genera el token.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Buscamos al usuario
        $user = User::where('email', $request->email)->first();

        // Validamos credenciales
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        /** @var \App\Models\User $user */
        // La línea de arriba quita el error rojo en 'createToken'
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Cierra la sesión eliminando el token.
     */ public function logout(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            // Usamos un método más directo que el editor siempre reconoce
            $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();
        }

        return response()->json(['message' => 'Sesión cerrada']);
    }
}