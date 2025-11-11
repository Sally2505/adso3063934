{{-- <x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                href="{{ route('password.request') }}">
                {{ __('Forgot your password?') }}
            </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}

@extends('layouts.home')

@section('title', 'login: Larapets')

@section('content')
<section class=" bg-[#ffffffa4] rounded-lg w-96 p-8 flex flex-col gap-2 items-center justify-center">
    <h1 class="flex gap-4 justify-center items-center text-4x1">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L116.69,136H24a8,8,0,0,1,0-16h92.69L90.34,93.66a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,141.66,133.66ZM200,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h64a8,8,0,0,0,8-8V40A8,8,0,0,0,200,32Z">
            </path>
        </svg>
        Login
    </h1>
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="card w-full max-w-sm">
            <form method="POST" action="{{ route('login') }}" class="card-body">
                @csrf
                <label class="label">Email</label>
                <input type="text" class="input" placeholder="Email" value="{{ old('email') }}"/>
                @error('email')
                <small class="text-error text-xs">{{ $message }}</small>
                @enderror

                <label class="label">Password</label>
                <input type="password" class="input" placeholder="Password" />
                @error('password')
                <small class="text-error text-xs">{{ $message }}</small>
                @enderror

                <button class="btn btn-outline btn-info mt-4">Login</button>

                <p class="text-sm text-center mt-4">
                    Don’t have an account?
                    <a href="{{ route('register') }}" class="link link-default">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    </form>
</section>
@endsection