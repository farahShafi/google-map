<template>
    <div class="container-fluid mainDiv">
        <div>
            <b-card-group deck>
                <b-card header="Add New Property">
                    <div>
                        <b-form @submit="onSubmit" @reset="onReset">
                            <b-form-group id="address-group-1"
                                    label="Property address:"
                                    label-for="address"
                                    description="Please see the Map for exact location"
                            >
                                <gmap-autocomplete style="width: 100%"
                                                   @place_changed="setPlace">
                                </gmap-autocomplete>
                                <!--<button @click="addMarker">Add</button>-->
                                <!--<b-form-input-->
                                        <!--id="address"-->
                                        <!--v-model="form.address"-->
                                        <!--required-->
                                        <!--placeholder="Enter address"-->
                                <!--&gt;</b-form-input>-->
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

                            <div class="col-lg-8 offset-lg-2 row btn-row">
                                <div class="col-xs-12 col-lg-6 btn-custom">
                                    <b-button type="submit" variant="info">Submit</b-button>
                                </div>
                                <div class="col-sx-12 col-lg-6 btn-custom">
                                    <b-button type="reset" variant="secondary">Reset</b-button>
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
                            {{this.currentPlace.formatted_address}}
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
    export default {
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
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.address = ''
                this.form.full_name = ''
                this.form.price = ''
                this.form.description = ''
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
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
