@extends('layouts.app')
@section('content')
<login>
    Loading...
</login>
@foreach(File::files(public_path()."/images/bgcovers") as $file)
    <img src="/images/bgcovers/{{ basename($file) }}" style="display: none">
@endforeach
@endsection
