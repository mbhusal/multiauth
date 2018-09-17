<?php

namespace App\Http\Controllers\Auth;

use App\Mail\verifyEmail;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Str;


class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This Controller handles the registration of new users as well as their
    | validation and creation. By default this Controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new Controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'verifytoken' => str::random(40),
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        Session::flash('status','Registered! But verify your E-mail to active your account.');
        $user= User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'verifytoken' => str::random(40),
        ]);

        $thisUser = User::findorfail($user->id);
        $this->sendEmail($thisUser);
        return $user;
    }

    //send verifacation
    public function sendEmail($thisUser){
        Mail::to($thisUser['email'])->send(new verifyEmail($thisUser));
    }

    //redirect before  email verification
    public function verifyEmailFirst()
    {
        return view('auth.verify.verifyEmailFirst');
    }

    //email sent, check mail
    public function EmailSent($email,$verifytoken)
    {
        $user = User::where(['email'=> $email, 'verifytoken'=> $verifytoken])->first();
        if($user){
            User::where(['email'=>$email, 'verifytoken'=>$verifytoken])->update(['status'=>1, 'verifytoken'=>NULL]);
            return redirect()->route('home');
        }else{
            return "User Not Found. It looks like you have already verified your email adderss.";
        }

    }
}
