@extends('layouts.app')
@section('content')
    <lostpass-reset token="{{ $token }}" version="{{ $version }}">
        @include("partials.loading")
    </lostpass-reset>
@endsection
