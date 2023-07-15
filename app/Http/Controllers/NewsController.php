<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::paginate(9));
        return Inertia::render('HomePage', [
            'title' => 'fffff',
            'desc' => 'short Desc',
            'news' => $news
        ]);
    }

    /*
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
        $news = new News();
        // dd($request->title);
        $news->title = $request->title;
        $news->category = $request->category;
        $news->description = $request->description;
        $news->author =  auth()->user()->email;
        $news->save();
        return redirect()->back()->with('message', 'Success save data !!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function show(news $news)
    {
        $news = news::where('author', auth()->user()->email)->orderBy('created_at', 'desc');
        $myNewsLists = new NewsCollection($news->paginate(9));
        // dd($myNewsList);
        return Inertia::render('Dashboard', [
            'myNewsLists' => $myNewsLists,
            'header'     => 'My News List Page'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('Dashboard', [
            'myNews' => $news->find($request->id),
            'header' => 'My News Edit Page'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, news $news)
    {
        news::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard')->with('message', 'Updated complete');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\news  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        news::where('id', $request->id)->delete();
        return redirect()->back();
    }
}
