from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import replocator.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', replocator.views.index, name='index'),
    # url(r'^db', hello.views.db, name='db'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^get-reps', replocator.views.show_reps, name='show representatives')
]
