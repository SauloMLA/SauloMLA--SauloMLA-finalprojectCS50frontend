<template>
    <div>
    <Navbar/>
    <div class="jumbotron vertical-center">
        <div class="container">
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/lux/bootstrap.min.css" integrity="sha384-9+PGKSqjRdkeAU7Eu4nkJU8RFaH8ace8HGXnkiKMP9I9Te0GJ4/km3L1Z8tXigpG" crossorigin="anonymous">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="text-center" style="border-radius:10px;">Notes </h1>
                    <hr><br>

                    <button type="button" class="btn btn-success" v-b-modal.note-modal>Add Note</button>
                    <br><br>
                    <b-form @submit="onSubmitCategory" @reset="onResetCategory" inline>
                        <label class="mb-2 mr-sm-2 mb-sm-0" for="input-8">Category: </label>
                        <b-form-select
                        id="input-8"
                        class="mb-2 mr-sm-2 mb-sm-0"
                        v-model="searchForm.category"
                        :options="categories"
                        required
                        ></b-form-select>
                        <b-button type="submit" class="mb-2 mr-sm-2 mb-sm-0 btn btn-warning">Submit</b-button>
                        <b-button type="reset" class="mb-2 mr-sm-2 mb-sm-0 btn btn-danger">Reset</b-button>
                    </b-form>
                    <br>
                    <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Done?</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="note, index in notes" :key="index">
                                <td>{{note[1]}}</td>
                                <td>{{note[2]}}</td>
                                <td>
                                    <span v-if="note[3] == true">Yes</span>
                                    <span v-else>No</span>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-info btn-sm" v-b-modal.note-edit-modal @click="editNote(note)">Update</button>
                                        <button type="button" class="btn btn-danger btn-sm" @click="deleteNote(note)">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <footer class="text-center" style="border-radius:10px;"> Copyright Saulo Mario Alaniz Leon &copy; - All Rights Reserved 2021

                    </footer>
                </div>
            </div>
            <!-- Modal 1 -->
            <b-modal ref="addNoteModal" id="note-modal" title="Add a new Note" hide-backdrop hide-footer>
                 <b-form @submit="onSubmit" @reset="onReset" class="w-100">
                    <b-form-group id="form-title-group" label="Title :" label-for="form-title-input">
                        <b-form-input id="form-title-input" type="text" v-model="addNoteForm.title" required placeholder="Enter Note">
                        </b-form-input>
                    </b-form-group>
                        <b-form-group label="Category :">
                            <b-form-select
                            id="input-8"
                            v-model="addNoteForm.category"
                            :options="categories"
                            required
                            >
                            <b-form-select-option value="Other">Other</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                        
                    <b-form-group id="form-category-group" label="New Category :" label-for="form-category-input" v-if="addNoteForm.category == 'Other'">
                        <b-form-input id="form-category-input" type="text" v-model="addNoteForm.categoryOther" required placeholder="Enter Category">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="form-done-group">
                            <b-form-checkbox id="form-checks" v-model="addNoteForm.done">Done?</b-form-checkbox>
                    </b-form-group>

                    <b-button type="submit" variant="outline-info">Submit</b-button>
                    <b-button type="reset" variant="outline-danger">Reset</b-button>
                </b-form>
            </b-modal>
            <!-- Modal 2 -->
            <b-modal ref="editNoteModal" id="note-edit-modal" title="Edit a Note" hide-backdrop hide-footer>
                 <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
                    <b-form-group id="form-title-edit-group" label="Title :" label-for="form-title-edit-input">
                        <b-form-input id="form-title-edit-input" type="text" v-model="editForm.title" required placeholder="Enter Note">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Category :">
                            <b-form-select
                            id="input-8-edit"
                            v-model="editForm.category"
                            required
                            >
                            <b-form-select-option v-for="(categoryS, index) in categories" :value="categoryS[0]" :key="index">{{categoryS[0]}}</b-form-select-option>
                            <b-form-select-option value="Other">Other</b-form-select-option>

                            </b-form-select>
                        </b-form-group>
                        
                    <b-form-group id="form-edit-category-group" label="New Category :" label-for="form-category-edit-input" v-if="editForm.category == 'Other'" >
                        <b-form-input id="form-category-edit-input" type="text" v-model="editForm.categoryOther" required placeholder="Enter Category">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="form-done-edit-group">
                            <b-form-checkbox id="form-checks" v-model="editForm.done">Done?</b-form-checkbox>
                    </b-form-group>

                    <b-button type="submit" variant="outline-info">Update</b-button>
                    <b-button type="reset" variant="outline-danger">Reset</b-button>
                </b-form>
            </b-modal>
        </div>
    </div>
</div>
</template>



<script>
import Navbar from '@/components/Navbar';
import axios from 'axios'
import auth from "@/logic/auth";
export default {
    components: {
        Navbar, 
    },
    data() {
        return {
            user : {
                id: ''
            },
            notes:[],
            categories:[],
            searchForm:{
                category: ''
            },
            addNoteForm: {
                title: '',
                category: "",
                categoryOther: "",
                done: 0,
            },
            editForm : {
                id: "",
                title: '',
                category: "",
                categoryOther: "",
                done: 0,
            },
        };
    },
    message: "",
    
    methods:{
        getNotes(){
            const path = `http://127.0.0.1:5000/notes?userId=${this.user.id}`;
            axios.get(path)
            .then((res) => {
                this.notes = res.data.notes;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getNotesByCategory(payload){
            const path = `http://127.0.0.1:5000/categories?userId=${this.user.id}`;
            axios.post(path, payload)
            .then((res) => {
                this.notes = res.data.notes;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        getCategories(){
            const path = `http://127.0.0.1:5000/categories?userId=${this.user.id}`;
            axios.get(path)
            .then((res) => {
                this.categories = res.data.categories;
            })
            .catch((err) => {
                console.error(err);
            });
        },
        addNote(payload){
            const path = 'http://127.0.0.1:5000/notes';
            axios.post(path, payload)
            .then(() => {
                this.getNotes();
                this.message = "Note Saved !"
                this.$swal("Success", this.message, "success")
                
            })
            .catch((err) => {
                console.error(err);
                this.getNotes();
            });
        },
        initForm(){
            this.addNoteForm.title = "",
            this.addNoteForm.category = [],
            this.addNoteForm.categoryOther = "",
            this.addNoteForm.done = 0;
            this.editForm.id = "",
            this.editForm.title = "",
            this.editForm.category = [],
            this.editForm.categoryOther = "",
            this.editForm.done = 0;
            this.getCategories(),
            this.searchForm.category = ""
        },
        onSubmitCategory(e){
            e.preventDefault();
            const payload = {
                 category: this.searchForm.category[0],
            };
            this.getNotesByCategory(payload)
        },
        onResetCategory(e){
            e.preventDefault();
            this.getNotes()
            this.searchForm.category = '';
        },
        onReset(e){
            e.preventDefault();
            this.$refs.addNoteModal.hide();
            this.initForm();
        },
        onSubmit(e){
            e.preventDefault();
            this.$refs.addNoteModal.hide();
            var selectedCategory = '';
            if (this.addNoteForm.category == "Other") {
                selectedCategory = this.addNoteForm.categoryOther
            }else {
                selectedCategory = this.addNoteForm.category
            }
            const payload = {
                 title: this.addNoteForm.title,
                 category: selectedCategory,
                 done: this.addNoteForm.done,
                 userId: this.user.id
            };
            this.addNote(payload);
            this.initForm();
        },
        onSubmitUpdate(e){
            e.preventDefault();
            this.$refs.editNoteModal.hide();
            var selectedCategory = '';
            if (this.editForm.category == "Other") {
                selectedCategory = this.editForm.categoryOther
            }else {
                selectedCategory = this.editForm.category
            }
            const payload = {
                 title: this.editForm.title,
                 category: selectedCategory,
                 done: this.editForm.done,
            };
            this.updateNote(payload, this.editForm.id);
        },

        updateNote(payload, noteId){
            const path = `http://127.0.0.1:5000/notes/${noteId}`;
            axios.put(path, payload)
            .then(() => {
                this.getNotes();
                this.message = "Note updated "
                this.$swal("Success", this.message, "success")
                this.initForm();
            })
            .catch((err) => {
                console.error(err);
                this.getNotes();
            });
        },
        editNote(note){
            this.editForm.id = note[0]
            this.editForm.title = note[1]
            this.editForm.category = note[2]
            this.editForm.categoryOther = ''
            var isDone = note[3] == 1 ? true : false
            this.editForm.done = isDone
            
        },
        onResetUpdate(e) {
            e.preventDefault();
            this.$refs.editNoteModal.hide();
            this.initForm();
            this.getNotes(); 
        },
        removeNote(noteID) {
        const path = `http://localhost:5000/notes/${noteID}`;
        axios.delete(path)
        .then(() => {
            this.getNotes();
            this.message = 'Note Removed 🗑️!';
            this.$swal("Success", this.message, "success")
            this.initForm();
        })
        .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            this.getNotes();
        });
        },
        // Handle Delete Button
        deleteNote(note) {
        this.removeNote(note[0]);
        },
        userLogged() {
            const res = auth.getUserLogged();
            return res
        }
    },
    created(){
        let user = this.userLogged();
        if (!user){
            this.$swal({
                title: 'Error',
                icon: 'error',
                html: 'You need to login to see this page',
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonColor: 'red',
            }).then(function() {
                window.location = "/login";
            });
        }
        else{
            user = JSON.parse(user)
            this.userName = user.name;
            this.user.id = user.id;
            
            this.getNotes();
            this.getCategories();
        }
    }
};
</script>

