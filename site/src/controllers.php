<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(array('127.0.0.1'));

// Homepage
$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig', array());
})->bind('homepage');

// Books -- old, delete.
// $app->get('/almohadon-de-plumas/{page}', function ($page) use ($app) {
//     return $app['twig']->render('books/almohadon_page_1.html.twig', array('title' => 'Almohadón de plumas'));
// })->bind('almohadon');


// Books
$app->get('/{slug}/', function ($slug) use ($app) {
    $fi = new FilesystemIterator("../templates/books/$slug", FilesystemIterator::SKIP_DOTS);
    $totalPages = iterator_count($fi) - 1;

    return $app['twig']->render("books/$slug/intro.html.twig", array('totalPages' => $totalPages));

})
->bind('book-intro'); // Route name

// Books
$app->get('/{slug}/{page}/', function ($slug, $page) use ($app) {
    $fi = new FilesystemIterator("../templates/books/$slug", FilesystemIterator::SKIP_DOTS);
    $totalPages = iterator_count($fi) - 1;

    if (!$page) {
        return $app['twig']->render("books/$slug/intro.html.twig", array('totalPages' => $totalPages));
    }
    else{
        return $app['twig']->render("books/$slug/page_$page.html.twig",
        array('page' => $page, 'totalPages' => $totalPages, 'slug' => $slug));
    }
})
->value('page', null) // Default page value
->bind('book'); // Route name

// Errors
$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
