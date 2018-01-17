<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css">
    {{--<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">--}}
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    {{--<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007593">--}}
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#007593">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <title>{{ config('app.name', 'UTRACK') }}</title>
</head>
<body>
<noscript>
        <p>
            No javascript supported. <a href="https://browsehappy.com/?locale={{ app()->getLocale() }}">Fresh</a> your favourite web browser.
        </p>
    </noscript>
        <script>
            window.locales = @json(config('app.locales'));
            @auth
            window.user = @json($user);
            @endauth
        </script>
    <div id="app">
        <flash message=""></flash>
        <question></question>
    @auth
    <app>
        Loading...
    </app>
    @endauth
    @yield('content')
    </div>
    <script defer src="{{ mix('js/manifest.js') }}"></script>
    <script defer src="{{ mix('js/vendor.js') }}"></script>
    <script defer src="{{ mix('js/app.js') }}"></script>
</body>
</html>
