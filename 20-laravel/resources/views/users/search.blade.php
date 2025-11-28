@forelse($users as $user)
<tr class="border-b border-[#f50b6c70] hover:bg-[#ffa6cb70] transition">

    <td class="hidden md:table-cell">{{ $user->id }}</td>

    {{-- FOTO FUNCIONANDO --}}
    <td class="py-2 whitespace-nowrap">
        <div class="avatar">
            <div class="w-14 md:w-16 rounded-full bg-gray-200 overflow-hidden">
                <img src="{{ asset('images/'.$user->photo) }}" loading="lazy" width="64" height="64"
                    class="object-cover w-full h-full transition-opacity duration-300" />
            </div>
        </div>
    </td>


    <td class="hidden md:table-cell">{{ $user->document }}</td>

    <td class="py-3 font-medium text-white whitespace-nowrap">
        {{ $user->fullname }}
    </td>

    <td class="hidden md:table-cell">
        @if ($user->role == 'Administrator')
        <div class="badge bg-[#f50b6c70] text-white border-none">Admin</div>
        @else
        <div class="badge bg-[#8c0bf550] text-white border-none">Customer</div>
        @endif
    </td>

    <td class="hidden md:table-cell">
        @if ($user->active == 1)
        <div class="badge bg-[#07e91e60] text-white border-none">Active</div>
        @else
        <div class="badge bg-[#e9070760] text-white border-none">Inactive</div>
        @endif
    </td>

    {{-- Actions --}}
    <td class="py-4 flex justify-center gap-4 md:gap-3 whitespace-nowrap">

        <a href="{{ url('users/'.$user->id) }}" class="text-[#ffffff] hover:text-[#a62874]">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z">
                </path>
            </svg>
        </a>

        <a href="{{ url('users/'.$user->id.'/edit') }}" class="text-[#ffffff] hover:text-[#a62874]">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z">
                </path>
            </svg>
        </a>

        <a href="javascript:;" data-fullname="{{ $user->fullname }}"
            class="text-[#ffffff] hover:text-[#a62874] btn-delete">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z">
                </path>
            </svg>
        </a>
        <form class="hidden" method="POST" action="{{ url('users/'.$user->id) }}">
            @csrf
            @method('delete')
        </form>
    </td>

</tr>
@empty
<tr class="bg-[#0009]">
    <td colspan="7" class="text-center py-18 text-white">
        No results founded!
    </td>
</tr>

@endforelse
<tr>