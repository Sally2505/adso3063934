@extends('layouts.dashboard')

@section('title', 'Module Pets: Larapets 🐈')

@section('content')

{{-- Título --}}
<h1 class="text-4xl font-bold text-black flex gap-2 items-center justify-center pb-4 border-b-2 mb-10">

    <span class="p-3 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="CurrentColor" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>
    </span>

    <span class="tracking-wide text-center">Module Pets</span>
</h1>

{{-- Botones --}}
<div class="join mx-auto mb-6 flex flex-wrap gap-2 justify-center">

    <a class="btn join-item bg-[#00000091] text-[#ffffff] border-none hover:bg-[#760f419d]"
        href="{{ url('pets/create') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5 md:size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm48,112H136v40a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h40a8,8,0,0,1,0,16Z">
            </path>
        </svg>
        <span class="hidden md:inline">Add Pet</span>
    </a>

    <a class="btn join-item bg-[#00000091] text-[#ffffff] border-none hover:bg-[#760f419d]" {{-- CAMBIO AQUÍ:
        de 'export/pets/pdf' a 'export/pet/pdf' --}} href="{{ url('export/pet/pdf') }}">
        Export PDF
    </a>

    <a class="btn join-item bg-[#00000091] text-[#ffffff] border-none hover:bg-[#760f419d]" {{-- CAMBIO AQUÍ:
        de 'export/pets/excel' a 'export/pet/excel' --}} href="{{ url('export/pet/excel') }}">
        Export Excel
    </a>

</div>

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
                {{-- <th class="hidden md:table-cell">Location</th> --}}
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

                    <a href="{{ url('pets/'.$pet->id) }}" class="text-[#ffffff] hover:text-[#a62874]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z">
                            </path>
                        </svg>
                    </a>

                    <a href="{{ url('pets/'.$pet->id.'/edit') }}" class="text-[#ffffff] hover:text-[#a62874]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
                            </path>
                        </svg>
                    </a>

                    <a href="javascript:;" data-fullname="{{ $pet->name }}"
                        class="text-[#ffffff] hover:text-[#a62874] btn-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                            </path>
                        </svg>
                    </a>
                    <form class="hidden" method="POST" action="{{ url('pets/'.$pet->id) }}">
                        @csrf
                        @method('delete')
                    </form>
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

{{-- MODALS --}}
<dialog id="modal_message" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Congratulations!</h3>

        <div role="alert" class="alert alert-success mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ session('message') }}</span>
        </div>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

<dialog id="modal_delete" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Are you Sure?</h3>

        <div role="alert" class="alert alert-warning mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>you want to delete: <strong class="fullname"></strong></span>
        </div>
        <div class="flex gap-2 mt-4">
            <form method="dialog">
                <button class="btn btn-error btn-outline btn-sm">Cancel</button>
            </form>
            <button class="btn btn-success btn-outline btn-sm btn-confirm">Confirm</button>
        </div>
    </div>
</dialog>

@endsection

@section('js')

<script>
    $(document).ready(function (){

        // Modal
        const modal_message = document.getElementById('modal_message')
        @if(session('message'))
            modal_message.showModal()
        @endif

        // Delete User
        $('table').on('click', '.btn-delete', function (){
            $fullname = $(this).data('fullname')
            $('.fullname').text($fullname)
            $frm = $(this).next()
            modal_delete.showModal()
        })
        $('.btn-confirm').click(function (e) {
            e.preventDefault()
            $frm.submit()
        })

        // Search --------------------------------
        function debounce(func, wait) {
            let timeout
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout)
                    func(...args)
                };
                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
            }
        }
        const search = debounce(function(query) {
            
            $token = $('input[name=_token]').val()
            
            $.post("search/pets", {'q': query, '_token': $token},
                function (data) {
                    $('.datalist').html(data).hide().fadeIn(1000)
                }
            )
        }, 500)

        $('body').on('input', '#qsearch', function(event) {
            event.preventDefault()
            const query = $(this).val()
            
            $('.datalist').html(`<tr>
                                    <td colspan="11" class="text-center py-18">
                                        <span class="loading loading-spinner loading-xl"></span>
                                    </td>
                                </tr>`)
            
            if(query != ''){
                search(query)
            }else{
                setTimeout(() => {
                    window.location.replace('pets')
                }, 500);
            }
            
        })

        //Import
        $('.btn-import').click(function(e){
            $('#file').click()
        })
        $('#file').change(function(e){
            $(this).parent().submit()
        })
    })
</script>

@endsection