@extends('layouts.dashboard')

@section('title', 'Make Adoption: Larapets 🐶')

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
        <svg xmlns="http://www.w3.org/2000/svg" class="size-12" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
            </path>
        </svg>
    </span>
    <span class="tracking-wide text-center">Make adoption</span>
</h1>

{{-- Search --}}
<label
    class="input text-white-700 bg-[#00000091] border border-[#ffa6cbce] shadow-sm rounded-xl mb-10 w-full max-w-md mx-auto flex items-center gap-2">
    <svg class="h-[1em] opacity-60 text-[#ff3478]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input id="qsearch" type="search" placeholder="Search..." name="qsearch" class="text-white w-full" />
</label>


{{-- Tabla --}}
<div class="overflow-x-auto rounded-3xl border border-[#ffa6cbce] bg-[#000000a6] shadow-xl p-3 md:p-4">

    <table class="table w-full">
        <thead>
            <tr class="bg-[#f50b6c70] text-white text-xs md:text-sm uppercase tracking-wide">
                <th class="hidden md:table-cell">Id</th>
                <th class="py-3">Photo</th>
                <th class="py-3">Name</th>
                <th class="hidden md:table-cell">Kind</th>
                <th class="hidden md:table-cell">Weight</th>
                <th class="hidden md:table-cell">Age</th>
                <th class="hidden md:table-cell">Breed</th>
                <th class="hidden md:table-cell py-3">Status</th>
                <th class="hidden md:table-cell py-3">Active</th>
                <th class="py-3 text-center">Actions</th>
            </tr>
        </thead>

        <tbody class="text-white text-sm md:text-base datalist">

            @foreach($pets as $pet)
            <tr class="border-b border-[#f50b6c70] hover:bg-[#ffa6cb70] transition">

                <td class="hidden md:table-cell">{{ $pet->id }}</td>

                {{-- FOTO --}}
                <td class="py-2 whitespace-nowrap">
                    <div class="avatar">
                        <div class="w-14 md:w-16 rounded-full bg-gray-200 overflow-hidden">
                            <img src="{{ asset('images/'.$pet->image) }}" loading="lazy" width="64" height="64"
                                class="object-cover w-full h-full transition-opacity duration-300" />
                        </div>
                    </div>
                </td>

                <td class="py-3 font-medium text-white whitespace-nowrap">
                    {{ $pet->name }}
                </td>

                <td class="hidden md:table-cell">{{ $pet->kind }}</td>
                <td class="hidden md:table-cell">{{ $pet->weight }} kg</td>
                <td class="hidden md:table-cell">{{ $pet->age }}</td>
                <td class="hidden md:table-cell">{{ $pet->breed }}</td>

                <td class="hidden md:table-cell">
                    @if ($pet->status)
                    <div class="badge bg-[#07e91e60] text-white border-none">Adopted</div>
                    @else
                    <div class="badge bg-[#e9d50760] text-white border-none">Waiting</div>
                    @endif
                </td>

                <td class="hidden md:table-cell">
                    @if ($pet->active)
                    <div class="badge bg-[#07e91e60] text-white border-none">Active</div>
                    @else
                    <div class="badge bg-[#e9070760] text-white border-none">Inactive</div>
                    @endif
                </td>

                {{-- Actions --}}
                <td class="py-4 flex justify-center gap-4 md:gap-3 whitespace-nowrap">

                    <a href="#" class="btn_adopt text-[#ffffff] hover:text-[#ff78c9]" data-id="{{ $pet->id }}"
                        data-name="{{ $pet->name }}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                            </path>
                        </svg>
                    </a>
                </td>

            </tr>
            @endforeach

            <tr>
                <td colspan="9">
                    {{ $pets->links('layouts.pagination') }}
                </td>
            </tr>

        </tbody>
    </table>

</div>

{{-- MODALES --}}
<dialog id="modal_message" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Congratulations!</h3>
        <div role="alert" class="alert alert-success mt-4">
            <span>{{ session('message') }}</span>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>

<dialog id="modal_delete" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Are you sure?</h3>
        <div role="alert" class="alert alert-error alert-soft mt-4">
            <span>You want to delete: <strong class="fullname"></strong></span>
        </div>
        <div class="flex gap-2 mt-6 justify-end">
            <form method="dialog">
                <button class="btn btn-error btn-outline btn-sm">Cancel</button>
            </form>
            <button type="button" class="btn btn-success btn-outline btn-sm btn_confirm">Confirm</button>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>

<dialog id="modal_adopt" class="modal">
    <div class="modal-box text-center">
        <h3 class="text-2xl font-bold mb-4">Confirm Adoption 💖</h3>
        <p class="mb-6">Are you sure you want to adopt <span id="modal_pet_name"
                class="font-semibold text-pink-500"></span>?</p>

        <form id="form_adopt" method="POST" action="{{ route('customer.adoptions.make') }}">
            @csrf
            <input type="hidden" name="pet_id" id="modal_pet_id">
            <button type="submit"
                class="btn btn-outline border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white hover:border-pink-600">
                Confirm Adoption 🐾
            </button>
        </form>
        <form method="dialog" class="modal-backdrop mt-4"><button class="btn btn-sm">Cancel</button></form>
    </div>
</dialog>

@endsection

@section('js')
<script>
$(document).ready(function () {

    // ========== SEARCH FIX ==========

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const search = debounce(function(query) {

        $.post("{{ route('customer.adoptions.search') }}", {
            q: query,
            _token: "{{ csrf_token() }}"
        }, function(data) {
            $('.datalist').html(data).hide().fadeIn(300);
        });

    }, 400);

    $('body').on('input', '#qsearch', function(event) {
        event.preventDefault();

        const query = $(this).val();

        $('.datalist').html(`
            <tr>
                <td colspan="11" class="text-center py-18">
                    <span class="loading loading-spinner loading-xl"></span>
                </td>
            </tr>
        `);

        if(query !== ''){
            search(query);
        } else {
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    });


    // ========== MODAL ADOPT ==========

    const modal_adopt = document.getElementById('modal_adopt');

    $('table').on('click', '.btn_adopt', function(e){
        e.preventDefault();
        const id = $(this).data('id');
        const name = $(this).data('name');

        $('#modal_pet_id').val(id);
        $('#modal_pet_name').text(name);

        modal_adopt.showModal();
    });

});
</script>
@endsection
