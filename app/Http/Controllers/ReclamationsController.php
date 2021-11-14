<?php

namespace App\Http\Controllers;

use App\Models\Reclamation;
use Illuminate\Http\Request;

class ReclamationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reclamations = new Reclamation();

        return $reclamations->with('users:id,name', 'types', 'status')->paginate(5);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $reclamation = new Reclamation();

        $this->validate($request, [
            'title' => 'required|max:50',
            'text' => 'required|max:255',
            'type_id' => 'required|integer'
        ]);

        $created_reclamation = $reclamation->create([
            'title' => $request->title,
            'text' => $request->text,
            'comment' => '',
            'user_id' => Auth()->user()->id,
            'type_id' => $request->type_id,
            'statut_id' => 1
        ]);

        return $created_reclamation->load('users:id,name', 'types', 'status');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reclamation = Reclamation::find($id);

        return $reclamation->load('users:id,name', 'types', 'status');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $reclamation = Reclamation::find($id);

        $reclamation->update([
            'comment' => $request->comment,
            'statut_id' => 2
        ]);

        $reclamation->save();

        return $reclamation->load('users:id,name', 'types', 'status');;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
