@extends('layouts.dashboard')

@section('title', 'Module Users: Larapets 🐈')

@section('content')

{{-- Título --}}
<h1 class="text-3xl md:text-4xl font-extrabold text-[#5EC9A5] flex items-center gap-3 justify-center pb-6 mb-10">

    <span class="p-3 bg-[#A8F1D0] rounded-2xl shadow-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" class="md:w-[34px] md:h-[34px]"
            fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Zm118.92,92a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212Z">
            </path>
        </svg>
    </span>

    <span class="tracking-wide text-center">Module Users</span>
</h1>

{{-- Botones --}}
<div class="join mx-auto mb-6 flex flex-wrap gap-2 justify-center">

    <a class="btn join-item bg-[#A8F1D0] text-[#2E6F56] border-none hover:bg-[#5EC9A5]"
        href="{{ url('users/create') }}">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5 md:size-6" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z">
            </path>
        </svg>
        <span class="hidden md:inline">Add User</span>
    </a>

    <a class="btn join-item bg-[#5EC9A5] text-white hover:bg-[#4CAF93]" href="{{ url('export/users/pdf') }}">
        Export PDF
    </a>

    <a class="btn join-item bg-[#5EC9A5] text-white hover:bg-[#4CAF93]" href="{{ url('export/users/excel') }}">
        Export Excel
    </a>

    <a class="btn join-item bg-[#5EC9A5] text-white hover:bg-[#4CAF93]" href="{{ url('import/users') }}">
        Import
    </a>
</div>

{{-- Search --}}
<label
    class="input text-gray-700 bg-white border border-[#A8F1D0] shadow-sm rounded-xl mb-10 w-full max-w-md mx-auto flex items-center gap-2">
    <svg class="h-[1em] opacity-60 text-[#5EC9A5]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </g>
    </svg>
    <input type="search" placeholder="Search..." name="qsearch" class="text-gray-700 w-full" />
</label>

{{-- Tabla --}}
<div class="overflow-x-auto rounded-3xl border border-[#A8F1D0] bg-[#F5F7F8] shadow-xl p-3 md:p-4">

    <table class="table w-full">
        <thead>
            <tr class="bg-[#A8F1D0] text-[#2E6F56] text-xs md:text-sm uppercase tracking-wide">
                <th class="hidden md:table-cell">Id</th>
                <th class="py-3">Photo</th>
                <th class="hidden md:table-cell">Document</th>
                <th class="py-3">Full Name</th>
                <th class="hidden md:table-cell">Role</th>
                <th class="hidden md:table-cell py-3">Active</th>
                <th class="py-3 text-center">Actions</th>
            </tr>
        </thead>

        <tbody class="text-gray-700 text-sm md:text-base">

            @foreach($users as $user)
            <tr class="border-b border-[#A8F1D080] hover:bg-[#A8F1D040] transition">

                <td class="hidden md:table-cell">{{ $user->id }}</td>

                {{-- FOTO FUNCIONANDO --}}
                <td class="py-2 whitespace-nowrap">
                    <div class="avatar">
                        <div class="w-14 md:w-16 rounded-full bg-gray-200 overflow-hidden">
                            <img src="{{ asset('photos/'.$user->photo) }}" loading="lazy" width="64" height="64"
                                class="object-cover w-full h-full transition-opacity duration-300" />
                        </div>
                    </div>
                </td>

                <td class="hidden md:table-cell">{{ $user->document }}</td>

                <td class="py-3 font-medium text-[#2E6F56] whitespace-nowrap">
                    {{ $user->fullname }}
                </td>

                <td class="hidden md:table-cell">
                    @if ($user->role == 'Administrator')
                    <div class="badge bg-[#5EC9A5] text-white">Admin</div>
                    @else
                    <div class="badge bg-gray-300 text-gray-700">Customer</div>
                    @endif
                </td>

                <td class="hidden md:table-cell">
                    @if ($user->active == 1)
                    <div class="badge bg-[#5EC9A5] text-white">Active</div>
                    @else
                    <div class="badge bg-red-300 text-red-700">Inactive</div>
                    @endif
                </td>

                {{-- Actions --}}
                <td class="py-4 flex justify-center gap-4 md:gap-3 whitespace-nowrap">

                    <a href="{{ url('users/'.$user->id) }}" class="text-[#5EC9A5] hover:text-[#2E6F56]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                            </path>
                        </svg>
                    </a>

                    <a href="{{ url('users/'.$user->id.'/edit') }}" class="text-[#5EC9A5] hover:text-[#2E6F56]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120Z">
                            </path>
                        </svg>
                    </a>

                    <a href="javascript:;" data-fullname="{{ $user->fullname }}"
                        class="text-red-400 hover:text-red-600 btn-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8Z">
                            </path>
                        </svg>
                    </a>
                    <form class="hidden" method="POST" action="{{ url('users/'.$user->id) }}">
                        @csrf
                        @method('delete')
                    </form>
                </td>

            </tr>
            @endforeach

            <tr>
                <td colspan="7">
                    {{ $users->links('layouts.pagination') }}
                </td>
            </tr>

        </tbody>
    </table>

</div>

{{-- MODAL --}}
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
            // if(confirm('Are you sure?')){
            //     alert($fullname + ' was deleted')
            //     // $(this).next().submit()
            // }
        })
        $('.btn-confirm').click(function (e) {
            e.preventDefault()
            $frm.submit()
        })
    })
</script>
@endsection