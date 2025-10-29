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
        $user->fullname = 'Mr robot';
        $user->gender = 'Male';
        $user->birthdate = '2001-01-01';
        $user->phone = 3432543452;
        $user->email= 'mrrobot@mail.com';
        $user->password= bcrypt('123');
        $user->role = 'Admin';
        $user->save();

        $user =  new User;
        $user->document = 745320123;
        $user->fullname = 'Garrosh';
        $user->gender = 'Male';
        $user->birthdate = '1901-02-02';
        $user->phone = 3433453452;
        $user->email= 'garroshGritoInfernal@gmail.com';
        $user->password= bcrypt('12345');
        $user->save();

    }
}