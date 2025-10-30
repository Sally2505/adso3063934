<?php

namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user =  new User;
        $user->document = 74532010;
        $user->fullname = 'John Wick';
        $user->gender = 'Male';
        $user->birthdate = '1974-01-01';
        $user->phone = 3432543452;
        $user->email= 'johnwick@mail.com';
        $user->password= bcrypt('admin');
        $user->role = 'Admin';
        $user->save();

        $user =  new User;
        $user->document = 12345667;
        $user->fullname = 'Lara Croft';
        $user->gender = 'female';
        $user->birthdate = '1992-02-02';
        $user->phone = 3433453452;
        $user->email= 'Tombraider@gmail.com';
        $user->password= bcrypt('12345');
        $user->save();

    }
}