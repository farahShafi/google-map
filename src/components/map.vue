<template>
    <div id="root">
        <gmap-map ref="mymap" :center="startLocation" :zoom="11" style="width: 100%; height: 100vh">

            <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" >
                <div class="popoverStyle">
                    Address: {{ infoContent.formatted_address }}<br>
                    Owner: {{ infoContent.full_name}}<br>
                    Price: {{ infoContent.price }}<br>
                    Description: {{ infoContent.description }}<br>
                </div>
            </gmap-info-window>

            <gmap-marker
                    v-for="(item, key) in properties"
                    :key="key"
                    :position="getPosition(item)"
                    :clickable="true"
                    @mouseover="toggleInfo(item, key)"
                    @mouseleave="infoOpened=false"
                    @click="toggleInfo(item, key)" />

        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: 'Gmap',
        data() {
            return {
                startLocation: {
                    lat: 40.5649781, lng: -111.8389726
                },
                properties: {
                    0: {
                        formatted_address: '412 West 9000 South, Sandy, UT 84070\n' +
                        'Sandy Sandy Utah United States',
                        full_name: 'Timcoat Tim',
                        price: '350k',
                        description: 'Single Home, Built in 1998',
                        lat: '40.5886089',
                        lng: '-111.9034992'
                    },
                    1: {
                        formatted_address: 'South Salt Lake, UT 84115\n' +
                        'South Salt Lake South Salt Lake, Salt Lake City Utah United States',
                        full_name: 'Chris Hornok',
                        price: '470k',
                        description: 'twin home, Built in 2010',
                        lat: '40.6973223',
                        lng: '-111.8784961'
                    }
                },
                infoPosition: null,
                infoContent: {
                    formatted_address: '',
                    full_name: '',
                    price: '',
                    description: '',
                    lat: '',
                    lng: ''
                },
                infoOpened: false,
                infoCurrentKey: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                }
            }
        },
        methods: {
            getPosition: function(marker) {
                return {
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },
            toggleInfo: function(marker, key) {
                this.infoPosition = this.getPosition(marker);
                this.infoContent.full_name = marker.full_name;
                this.infoContent.formatted_address = marker.formatted_address;
                this.infoContent.price = marker.price;
                this.infoContent.description = marker.description;
                if (this.infoCurrentKey == key) {
                    this.infoOpened = !this.infoOpened;
                } else {
                    this.infoOpened = true;
                    this.infoCurrentKey = key;
                }
            }
        }
    }

</script>