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
                <input type="text" name="email" class="input" placeholder="Email" value="{{ old('email') }}"/>
                @error('email')
                <small class="text-error text-xs">{{ $message }}</small>
                @enderror

                <label class="label">Password</label>
                <input type="password" name="password" class="input" placeholder="Password" />
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
                <p class="text-sm">
                            <a class="text-sm text-center mt-2 link link-default"
                                href="{{ route('password.request') }}">
                                Forgot your password?
                            </a>
                        </p>
            </form>
        </div>
    </form>
</section>
@endsection