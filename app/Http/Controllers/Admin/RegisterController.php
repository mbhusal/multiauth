<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use App\Http\Requests\AdminRequest;
use App\Http\Controllers\Controller;
use App\Mail\verifyEmail;
use App\Mail\verifyEmailAdmin;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
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
    protected $redirectTo = 'admin/home';

    /**
     * Create a new Controller instance.
     *
     * @return void
     */

    public function __construct()
    {
        $this->middleware('guest');
    }

//admin registration form

    public function showRegistrationForm()
    {
        return view('admin.register');
    }


//register admin
    public function registeradmin(AdminRequest $request)
    {
        $admin = new Admin();

        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = bcrypt($request->password);
        $admin->verifytoken = str::random(40);
        $admin->save();
//        $this->guard()->login($admin);

        $thisAdmin = Admin::findorfail($admin->id);
        $this->EmailSentAdmin($thisAdmin);

        Session::flash('status','Registered!! But first verify your account to activate your account.');

        return redirect(route('admin.login'));
    }

    public function EmailSentAdmin($thisAdmin){
        Mail::to($thisAdmin['email'])->send(new verifyEmailAdmin($thisAdmin));
    }

    public function emailSent($email , $verifytoken){
        $admin = Admin::where(['email'=> $email , 'verifytoken'=>$verifytoken])->first();
        if($admin){
            Admin::where(['email'=> $email , 'verifytoken'=>$verifytoken])->update(['status'=>1 , 'verifytoken'=>Null]);
            return redirect()->route('admin.home');
        }else{
            return "User Not Found. It looks like you have already verified your email adderss.";
        }

    }

}
