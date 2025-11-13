@extends('layouts.home')

@section('title', 'Forgot your password: Larapets 🐶')

@section('content')
    <section class=" bg-[#fff6] rounded-lg w-4/12 p-6 flex flex-col gap-4 items-center justify-center">
        <h1 class="flex gap-4 justify-center items-center text-4-x1">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M48,56V200a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0Zm92,54.5L120,117V96a8,8,0,0,0-16,0v21L84,110.5a8,8,0,0,0-5,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,140,110.5ZM246,115.64A8,8,0,0,0,236,110.5L216,117V96a8,8,0,0,0-16,0v21l-20-6.49a8,8,0,0,0-4.95,15.22l20,6.49-12.34,17a8,8,0,1,0,12.94,9.4l12.34-17,12.34,17a8,8,0,1,0,12.94-9.4l-12.34-17,20-6.49A8,8,0,0,0,246,115.64Z"></path></svg>
    Forgot your password?
        </h1>
            <div class="card w-full max-w-sm">
                <p>
                    Forgot your password?
                     No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                </p>
            <form method="POST" action="{{ route('password.email') }}" class="card-body">
                @csrf
                <label class="label">Email:</label>
                <input type="text" class="input bg-[#fff6] w-full" name="email" placeholder="Email" value="{{ old('email') }}" />
                @error('email')
                    <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                @enderror

                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white mt-4">Email Password Reset Link</button>
            </form>
        </div>
    </section>
@endsection