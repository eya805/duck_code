from django.core.paginator import Paginator
from django.db.models import Q
from django.shortcuts import get_object_or_404, render

from .models import Place


def list_places(request):
    query = (request.GET.get("q") or "").strip()

    qs = (
        Place.objects.filter(active=True)
        .select_related("bookableservice")
        .prefetch_related("images")
        .order_by("name")
    )
    if query:
        qs = qs.filter(Q(name__icontains=query) | Q(discrption__icontains=query))

    paginator = Paginator(qs, 9)
    page_obj = paginator.get_page(request.GET.get("page"))

    context = {
        "places": page_obj.object_list,
        "page_obj": page_obj,
        "query": query,
        "total_count": paginator.count,
    }
    return render(request, "places/explore.html", context)


def detail_place(request, slug):
    place = get_object_or_404(
        Place.objects.select_related("bookableservice").prefetch_related("images"),
        slug=slug,
    )
    service = getattr(place, "bookableservice", None)
    related = (
        Place.objects.filter(active=True)
        .exclude(pk=place.pk)
        .select_related("bookableservice")
        .prefetch_related("images")[:3]
    )

    context = {
        "place": place,
        "service": service,
        "related": related,
        "show_booking": False,
    }
    return render(request, "places/place.html", context)