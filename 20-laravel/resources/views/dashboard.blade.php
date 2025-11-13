@extends('layouts.dashboard')

@section('title', 'Dashboard ADMIN: Larapets 🐈')

@section('content')
<div class="text-center mt-8">
    <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
    <h2 class="text-xl mb-4">{{ Auth::user()->fullname }}</h2>
    <h3 class="text-lg text-gray-700 mb-6">¡Has iniciado sesión correctamente! 🎉</h3>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <a href="javascript:;" class="text-red-600 hover:underline font-semibold"
            onclick="event.preventDefault(); this.closest('form').submit();">
            Cerrar sesión
        </a>
    </form>
</div>
@endsection