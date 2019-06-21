<template>
    <div class="container-fluid mainDiv">
        <div>
            <b-card-group deck>
                <b-card header="Add New Property">
                    <div>
                        <b-form>
                            <b-form-group id="address-group-1"
                                    label="Property address:"
                                    label-for="address"
                                    description="Please see the Map for exact location"
                            >
                                <gmap-autocomplete style="width: 100%"
                                                   @place_changed="setPlace">
                                </gmap-autocomplete>
                            </b-form-group>

                            <b-form-group id="input-group-2"
                                          label="Owner's Name:"
                                          label-for="full_name">
                                <b-form-input
                                        id="full_name"
                                        v-model="form.full_name"
                                        required
                                        placeholder="Enter name"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-3"
                                          label="Asking price:"
                                          label-for="price">
                                <b-form-input
                                        id="price"
                                        v-model="form.price"
                                        required
                                        placeholder="Enter price"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-textarea
                                    id="textarea"
                                    v-model="form.description"
                                    placeholder="Enter Description..."
                                    rows="3"
                                    max-rows="6"
                            ></b-form-textarea>

                            <div class="col-lg-6 offset-lg-3 row btn-row">
                                <div class="btn-custom">
                                    <b-button @click="onSubmit" variant="info">Submit</b-button>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </b-card>

                <b-card header="Map">
                    <gmap-map
                            :center="center"
                            :zoom="12"
                            style="width:100%;  height: 500px;"
                    >
                        <gmap-info-window v-if='this.currentPlace' :options="infoOptions" :position="infoPosition" :opened="infoOpened" >
                            <div class="popoverStyle">
                                Address: {{this.currentPlace.formatted_address}}
                            </div>
                        </gmap-info-window>
                        <gmap-marker
                                v-for="(m, key) in markers"
                                :key="key"
                                :position="m.position"
                                @click="center=m.position, toggleInfo(m, key)"
                                :clickable="true"
                                @mouseover="toggleInfo(m, key)"
                                @mouseleave="infoOpened=false"
                        ></gmap-marker>
                    </gmap-map>

                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { mapGetters } from 'vuex'

    const namespaced = true

    export default {
        namespaced,
        name: 'new',
        data() {
            return {
                form: {
                    address: '',
                    full_name: '',
                    price: '',
                    description:''
                },
                c: true,
                center: { lat: 40.7607793, lng: -111.8910474 },
                markers: [
                ],
                places: [],
                currentPlace: null,
                infoPosition: null,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                },
                infoOpened: false,
            }
        },
        mounted() {
            this.geolocate();
        },
        created(){
            console.log('all in new created', this.allProperties)
        },
        computed: {
            ...mapGetters('allProperties',['allProperties']),
        },
        methods: {
            ...mapActions('properties',['addProperty']),
            onSubmit() {
                console.log('this.form', this.form)
                if(this.form.address.formatted_address){
                    const propertyNew = {
                        formatted_address: this.form.address.formatted_address,
                        full_name: this.form.full_name,
                        price: this.form.price,
                        description: this.form.description,
                        lat: this.form.address.geometry.location.lat(),
                        lng: this.form.address.geometry.location.lng()
                    }
                    // console.log('new prop', propertyNew)
                    console.log('storage in map', this.allProperties)
                    var data = []
                    data = this.allProperties
                    console.log('oldData', data)
                    data.push(propertyNew)
                    this.addProperty(data)
                    this.$router.push({
                        name: 'Map',
                    });
                } else {
                    alert ('Please complete the Form to submit')
                }
            },
            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place
                this.addMarker()
            },
            addMarker() {
                if (this.currentPlace) {
                    console.log('this.currentPlace', this.currentPlace)
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    console.log('markers in currentPlace', marker)
                    this.markers = []
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;
                    // this.currentPlace = null;
                    this.form.address = this.currentPlace

                }
            },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            },
            getPosition: function(marker) {
                return {
                    lat: parseFloat(marker.lat),
                    lng: parseFloat(marker.lng)
                }
            },
            toggleInfo: function(marker, key) {
                this.infoPosition = this.getPosition(marker);
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
