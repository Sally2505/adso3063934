@extends('layouts.dashboard')

@section('title', 'Module Adoptions: Larapets 🐶')

@section('content')

{{-- Mensaje de éxito --}}
@if(session('message'))
<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
    {{ session('message') }}
</div>
@endif

{{-- Título --}}
<h1 class="text-3xl md:text-4xl text-black flex items-center gap-3 justify-center pb-6 mb-10">
    <span class="p-3 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                            </path>
                        </svg>
    </span>
    <span class="tracking-wide text-center">My adoptions</span>
</h1>

{{-- Adoptions Cards --}}
<div class="datalist">
    @forelse ($adoptions as $adoption)
    <div class="flex flex-col items-center mb-8 w-full max-w-lg mx-auto bg-gradient-to-br from-[#0000004e] to-[#4c05267b] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">

        {{-- images --}}
        <div class="flex justify-center gap-4 -space-x-6">
            <div class="avatar">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#a80136c8] shadow-inner">
                    <img src="{{ asset('images/'.$adoption->user->photo) }}" alt="User Photo" />
                </div>
            </div>
            <div class="avatar">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#a80136c8] shadow-inner">
                    <img src="{{ asset('images/'.$adoption->pet->image) }}" alt="Pet Photo" />
                </div>
            </div>
        </div>

        {{-- Info --}}
        <h4 class="text-white text-center mt-4 text-lg">
            <span class="underline font-bold text-[#fd8adc]">{{ $adoption->pet->name }}</span>
            was adopted by
            <span class="underline font-bold text-[#ff0454]">{{ $adoption->user->fullname }}</span>
            <br>
            <span class="text-gray-300 text-sm">{{ $adoption->created_at->diffForHumans() }}</span>
        </h4>

        {{-- Show Button --}}
       <a class="btn btn-outline border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:border-pink-600 transition-all duration-300 shadow-md hover:shadow-pink-500/40 rounded-xl" href="{{ route('customer.adoptions.show', $adoption->id) }}">
    Show More
</a>


    </div>
    @empty
    <div class="text-center text-white bg-black/50 rounded-xl p-4 mt-10 max-w-md mx-auto">
        No results found.
    </div>
    @endforelse
</div>

@endsection

@section('js')

@endsection