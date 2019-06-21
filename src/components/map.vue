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
                    v-for="(item, key) in allProperties"
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
    import { mapGetters } from 'vuex'
    export default {
        name: 'Gmap',
        data() {
            return {
                startLocation: {
                    lat: 40.5649781, lng: -111.8389726
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
        computed: {
            ...mapGetters('allProperties',['allProperties'])
        },
        created(){
            console.log('all', this.allProperties)
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