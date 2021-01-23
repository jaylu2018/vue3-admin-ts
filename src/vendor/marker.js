export default function createMapMarker({ lat, lng, map, img, msg }) {
    var marker = new qq.maps.Marker({
        position: new qq.maps.LatLng(lat, lng),
        map,
    });

    marker.setAnimation(qq.maps.MarkerAnimation.DOWN);
    var icon = new qq.maps.MarkerImage(
        img,
        null,
        null,
        null,
        new qq.maps.Size(42, 42)
    );
    marker.setIcon(icon);

    //添加信息窗口
    var info = new qq.maps.InfoWindow({
        map,
    });
    qq.maps.event.addListener(marker, "click", function () {
        info.open();
        info.setContent(
            `<div style="
            text-align:center;
            white-space:nowrap;
            margin:10px;">
            ${msg}
            </div>`
        );
        info.setPosition(marker.getPosition());
    });
}