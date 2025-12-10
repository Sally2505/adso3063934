@if($pets->count() == 0)
<tr class="h-24">
    <td colspan="9" class="text-center align-middle py-4 text-white font-bold">
        No pets found
    </td>
</tr>
@else
@foreach($pets as $pet)
<tr class="border-b border-[#f1a8b380] hover:bg-[#f1a8b840] transition">

    <td class="hidden md:table-cell">{{ $pet->id }}</td>

    <td class="py-2 whitespace-nowrap">
        <div class="avatar">
            <div class="w-14 md:w-16 rounded-full bg-gray-200 overflow-hidden">
                <img src="{{ asset('images/'.$pet->image) }}" loading="lazy" width="64" height="64"
                    class="object-cover w-full h-full transition-opacity duration-300" />
            </div>
        </div>
    </td>

    <td class="py-3 font-medium text-white whitespace-nowrap">{{ $pet->name }}</td>
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

    <td class="py-4 flex justify-center gap-4 md:gap-3 whitespace-nowrap">
        <a href="#" class="btn_adopt text-[#ffffff] hover:text-[#ff78c9]" data-id="{{ $pet->id }}"
            data-name="{{ $pet->name }}">
            Adopt
        </a>
    </td>

</tr>
@endforeach
<tr>
    <td colspan="9">
        {{ $pets->links('layouts.pagination') }}
    </td>
</tr>
@endif
