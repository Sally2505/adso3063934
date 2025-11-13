@extends('layouts.home')

@section('title', 'Register: Larapets 🐶')

@section('content')
    <section class="bg-[#ffffffb1] rounded-lg w-full max-w-md md:max-w-2xl p-6 md:p-8 flex flex-col gap-4 items-center justify-center outline-2 outline-[#fff6]">
        <h1 class="flex gap-4 justify-center items-center text-4-x1 pb-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" fill="#000000" viewBox="0 0 256 256"><path d="M176,216a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H168A8,8,0,0,1,176,216ZM247.86,93.15a8,8,0,0,1-3.76,5.39l-147.41,88a40.18,40.18,0,0,1-20.26,5.52,39.78,39.78,0,0,1-27.28-10.87l-.12-.12L13,145.8a16,16,0,0,1,4.49-26.21l3-1.47a8,8,0,0,1,6.08-.4l28.26,9.54L75,115.06,53.17,93.87A16,16,0,0,1,57.7,67.4l.32-.13,7.15-2.71a8,8,0,0,1,5.59,0L124.7,84.38,176.27,53.6a39.82,39.82,0,0,1,51.28,9.12l.12.15,18.64,23.89A8,8,0,0,1,247.86,93.15Zm-19.74-3.7-13-16.67a23.88,23.88,0,0,0-30.68-5.42l-54.8,32.72a8.06,8.06,0,0,1-6.87.64L68,80.58l-4,1.53.21.2L93.57,110.8a8,8,0,0,1-1.43,12.58L59.93,142.87a8,8,0,0,1-6.7.73l-28.67-9.67-.19.1-.37.17a.71.71,0,0,1,.13.12l36,35.26a23.85,23.85,0,0,0,28.42,3.18Z"></path></svg>
            Register
        </h1>
            <div class="card w-full">
            <form method="POST" action="{{ route('register') }}" class="flex flex-col lg:flex-row gap-6 w-full">
                <div class="w-full lg:w-1/2">
                @csrf
                {{-- Document --}}

                    <label class="label text-white">Document:</label>
                   <input type="text" class="input bg-[#fff9] outline-0" name="document" placeholder="Document" value="{{ old('document') }}" />
                   @error('document')
                       <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                   @enderror
   
                   {{-- Fullname --}}
   
                   <label class="label text-white">Fullname:</label>
                   <input type="text" class="input bg-[#fff9] outline-0" name="fullname" placeholder="Fullname" value="{{ old('fullname') }}" />
                   @error('fullname')
                       <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                   @enderror
   
                   {{-- Gender --}}
   
                   <label class="label text-white">Gender:</label>
                   <select name="gender" class="select bg-#fff9] outline-0">
                       <option value="">Select Gender</option>
                       <option value="Female" @if(old('gender') == 'Female') selected @endif>Female</option>
                       <option value="Male" @if(old('gender') == 'Male') selected @endif>Male</option>
                       <option value="">Other</option>
                   </select>
                   @error('gender')
                       <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                   @enderror
   
                   {{-- Birthday --}}
   
                   <label class="label text-white">Birthday:</label>
                   <input type="date" class="input bg-[#fff9] outline-0" name="birthday" placeholder="2000-02-23" value="{{ old('birthday') }}" />
                   @error('birthday')
                       <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                   @enderror


                </div>

                <div class="w-full lg:w-1/2">

                    {{-- Phone --}}
    
                    <label class="label text-white">Phone:</label>
                    <input type="text" class="input bg-[#fff9] outline-0" name="phone" placeholder="3012928372" value="{{ old('phone') }}" />
                    @error('phone')
                        <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                    @enderror
                    
                    {{-- Email --}}
    
                    <label class="label text-white">Email:</label>
                    <input type="text" class="input bg-[#fff9] outline-0" name="email" placeholder="Email" value="{{ old('email') }}" />
                    @error('email')
                        <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                    @enderror
    
                    {{-- Password --}}
    
                    <label class="label text-white">Password</label>
                    <input type="password" class="input bg-[#fff9]" name=password placeholder="Password" />
                    @error('password')
                        <small class="badge badge-error w-full mt-1 py-6">{{ $message }}</small>
                    @enderror
    
                    {{-- Password Confirmation --}}
    
                      <label class="label text-white">Password Confirmation</label>
                    <input type="password" class="input bg-[#fff9]" name=password_confirmation placeholder="Password" />

                <button class="btn btn-outline hover:bg-[#fff6] hover:text-white w-full mt-4">Register</button>

                     
                     <p class="text-sm text-center mt-2">
                    <a  class="link link-default" href="{{ route('login') }}">
                       Already registered?
                    </a>
                </p>
            </div>
        </form>
    </div>
 </section>
@endsection