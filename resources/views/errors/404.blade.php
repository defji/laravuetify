@extends('layouts.app',[ 'version' => file_get_contents(base_path()."/VERSION")])
@section('content')
    <e404></e404>
@endsection

{{--@extends('errors::layout')--}}

{{--@section('title', 'Error')--}}

{{--@section('message', '404, nincsilyen')--}}

