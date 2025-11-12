@extends('layouts.home')

@section('title', 'Register: Larapets')

@section('content')
<section class=" bg-[#ffffffa4] rounded-lg md:w-[640px] w-[360px] p-8 flex flex-col gap-2 items-center justify-center">
    <h1 class="flex gap-4 justify-center items-center text-4x1">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M200,112a8,8,0,0,1-8,8H152a8,8,0,0,1,0-16h40A8,8,0,0,1,200,112Zm-8,24H152a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm40-80V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Zm-80.26-34a8,8,0,1,1-15.5,4c-2.63-10.26-13.06-18-24.25-18s-21.61,7.74-24.25,18a8,8,0,1,1-15.5-4,39.84,39.84,0,0,1,17.19-23.34,32,32,0,1,1,45.12,0A39.76,39.76,0,0,1,135.75,166ZM96,136a16,16,0,1,0-16-16A16,16,0,0,0,96,136Z">
            </path>
        </svg>
        Register
    </h1>
    <div class="card w-full"></div>
    <method="POST" action="{{ route('register') }}" class="flex flex-col md:flex-row gap-4 mt-4">
        <div class="w-full md:w-[320px]">
        @csrf

        
            {{-- document --}}
            <label class="label">Document:</label>
            <input type="text" class="input" placeholder="Document" name="document" value="{{ old('document') }}" />
            @error('document')
            <small class="text-error text-xs">{{ $message }}</small>
            @enderror

            {{-- full name --}}
            <label class="label">Full name:</label>
            <input type="text" class="input" placeholder="Full name" name="fullname" value="{{ old('email') }}" />
            @error('fullname')
            <small class="text-error text-xs">{{ $message }}</small>
            @enderror

            {{-- gender --}}
            <label class="label">Gender:</label>
            <select name="gender" class="input" aria-placeholder="Select...">
                <option value="">Select...</option>
                <option value="Female" @if(old('gender')=='Female' ) select @endif>Female</option>
                <option value="" @if(old('gender')=='Male' ) select @endif>Male</option>
            </select>
            @error('password')
            <small class="text-error text-xs">{{ $message }}</small>
            @enderror

            {{-- birthdate --}}
            <label class="label">Birthdate:</label>
            <input type="date" class="input" placeholder="Birthdate" name="birthdate" value="{{ old('birthdate') }}" />
            @error('birthdate')
            <small class="text-error text-xs">{{ $message }}</small>
            @enderror
        </div>

        {{-- phone --}}
        <label class="label">Phone:</label>
        <input type="text" class="input" placeholder="3105024567" name="phone" value="{{ old('phone') }}" />
        @error('phone')
        <small class="text-error text-xs">{{ $message }}</small>
        @enderror

        {{-- Email --}}
        <label class="label">Email:</label>
        <input type="text" class="input" name="email" placeholder="Email" value="{{ old('email') }}" />
        @error('email')
        <small class="text-error text-xs">{{ $message }}</small>
        @enderror

        {{-- Password --}}
        <label class="label">Password:</label>
        <input type="password" class="input" placeholder="Password" name="password" />
        @error('password')
        <small class="text-error text-xs">{{ $message }}</small>
        @enderror

        {{-- Password confirmation--}}
        <label class="label">Password Confirmation:</label>
        <input type="password" class="input" placeholder="Confirm your password" name="password_confirmation" />
        @error('password_confirmation')
        <small class="text-error text-xs">{{ $message }}</small>
        @enderror


        <button class="btn btn-outline btn-info mt-4">Register</button>

        <p class="text-sm text-center mt-2">
            <a href="{{ route('login') }}" class="link link-default">
                Alredy registered?
            </a>
        </p>
        </form>
        </div>
        </form>
</section>
@endsection