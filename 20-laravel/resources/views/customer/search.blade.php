@if($pets->count() == 0)
<tr>
    <td colspan="10" class="text-center text-white font-bold py-4">
        No pets found
    </td>
</tr>
@else
@foreach($pets as $pet)
<tr class="border-b border-[#f50b6c70] hover:bg-[#ffa6cb70] transition">

    <td class="hidden md:table-cell">{{ $pet->id }}</td>

    <td class="py-2">
        <div class="avatar">
            <div class="w-14 rounded-full overflow-hidden bg-gray-300">
                <img src="{{ asset('images/'.$pet->image) }}" class="object-cover w-full h-full" />
            </div>
        </div>
    </td>

    <td class="text-white font-semibold">{{ $pet->name }}</td>
    <td class="hidden md:table-cell">{{ $pet->kind }}</td>
    <td class="hidden md:table-cell">{{ $pet->weight }} kg</td>
    <td class="hidden md:table-cell">{{ $pet->age }}</td>
    <td class="hidden md:table-cell">{{ $pet->breed }}</td>

    <td>
        @if($pet->status)
            <div class="badge bg-green-600/60 text-white border-none">Adopted</div>
        @else
            <div class="badge bg-yellow-600/60 text-white border-none">Waiting</div>
        @endif
    </td>

    <td>
        @if($pet->active)
            <div class="badge bg-green-600/60 text-white border-none">Active</div>
        @else
            <div class="badge bg-red-600/60 text-white border-none">Inactive</div>
        @endif
    </td>

    <td class="py-4 flex justify-center gap-4 md:gap-3 whitespace-nowrap">

        <a href="#" class="btn_adopt text-[#ffffff] hover:text-[#ff78c9]" data-id="{{ $pet->id }}"
            data-name="{{ $pet->name }}">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="currentColor" viewBox="0 0 256 256">
                <path
                    d="M230.33,141.06a24.34,24.34,0,0,0-18.61-4.77C230.5,117.33,240,98.48,240,80c0-26.47-21.29-48-47.46-48A47.58,47.58,0,0,0,156,48.75,47.58,47.58,0,0,0,119.46,32C93.29,32,72,53.53,72,80c0,11,3.24,21.69,10.06,33a31.87,31.87,0,0,0-14.75,8.4L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM119.46,48A31.15,31.15,0,0,1,148.6,67a8,8,0,0,0,14.8,0,31.15,31.15,0,0,1,29.14-19C209.59,48,224,62.65,224,80c0,19.51-15.79,41.58-45.66,63.9l-11.09,2.55A28,28,0,0,0,140,112H100.68C92.05,100.36,88,90.12,88,80,88,62.65,102.41,48,119.46,48ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9Z">
                </path>
            </svg>
        </a>

</tr>
@endforeach
@endif
