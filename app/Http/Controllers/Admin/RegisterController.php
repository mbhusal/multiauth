<?php

namespace App\Http\Controllers\Admin;

use App\Admin;
use App\Http\Requests\AdminRequest;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

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

        $admin->save();


        $this->guard()->login($admin);

        return $this->registered($request, $admin)
            ?: redirect($this->redirectPath());
    }


    public function redirectPath()
    {
        if (method_exists($this, 'redirectTo')) {
            return $this->redirectTo();
        }

        return property_exists($this, 'redirectTo') ? $this->redirectTo : 'admin/home';
    }


}
