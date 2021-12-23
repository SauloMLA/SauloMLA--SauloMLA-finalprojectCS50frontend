<template>
    <div class="jumbotron vertical-center">
        <div class="container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css" integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R" crossorigin="anonymous">
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="text-center bg-primary text-white" style="border-radius:10px;">Notes </h1>
                    <hr><br>
                    <!-- Alert Message soon -->
                    <b-alert variant="success" v-if="showMessage" show>{{message}}</b-alert>
                    <button type="button" class="btn btn-success" v-b-modal.note-modal>Add Note</button>
                    <br><br>
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
                                <td>{{note.title}}</td>
                                <td>{{note.category}}</td>
                                <td>
                                    <span v-if="note.done">Yes</span>
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
                    <footer class="bg-primary text-white text-center" style="border-radius:10px;"> Copyright &copy; - All Rights Reserved 2021

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
                    <b-form-group id="form-category-group" label="Category :" label-for="form-category-input">
                        <b-form-input id="form-category-input" type="text" v-model="addNoteForm.category" required placeholder="Enter Category">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="form-done-group">
                        <b-form-checkbox-group id="form-checks" v-model="addNoteForm.done">
                            <b-form-checkbox value="true">Done?</b-form-checkbox>
                        </b-form-checkbox-group>
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
                    <b-form-group id="form-edit-category-group" label="Category :" label-for="form-category-edit-input">
                        <b-form-input id="form-category-edit-input" type="text" v-model="editForm.category" required placeholder="Enter Category">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="form-done-edit-group">
                        <b-form-checkbox-group id="form-checks" v-model="editForm.done">
                            <b-form-checkbox value="true">Done?</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>

                    <b-button type="submit" variant="outline-info">Update</b-button>
                    <b-button type="reset" variant="outline-danger">Reset</b-button>
                </b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            notes:[],
            addNoteForm: {
                title: '',
                category: "",
                done: false,
            },
            editForm : {
                id: "",
                title: '',
                category: "",
                done: false,
            }
        };
    },
    message: "",
    methods:{
        getNotes(){
            const path = 'http://127.0.0.1:5000/notes';
            axios.get(path)
            .then((res) => {
                this.notes = res.data.notes;
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
                this.showMessage = true;
            })
            .catch((err) => {
                console.error(err);
                this.getNotes();
            });
        },
        
        initForm(){
            this.addNoteForm.title = "",
            this.addNoteForm.category = "",
            this.addNoteForm.done = false;
            this.editForm.id = "",
            this.editForm.title = "",
            this.editForm.category = "",
            this.editForm.done = false;
        },
        onSubmit(e){
            e.preventDefault();
            this.$refs.addNoteModal.hide();

            const payload = {
                 title: this.addNoteForm.title,
                 category: this.addNoteForm.category,
                 done: this.addNoteForm.done,
            };
            this.addNote(payload);
            this.initForm();
        },
        onReset(e){
            e.preventDefault();
            this.$refs.addNoteModal.hide();
            this.initForm();
        },

        onSubmitUpdate(e){
            e.preventDefault();
            this.$refs.editNoteModal.hide();
            const payload = {
                 title: this.editForm.title,
                 category: this.editForm.category,
                 done: this.editForm.done,
            };
            this.updateNote(payload, this.editForm.id);
        },

        updateNote(payload, noteId){
            const path = `http://127.0.0.1:5000/notes/${noteId}`;
            axios.put(path, payload)
            .then(() => {
                this.getNotes();
                this.message = "Note updated!"
                this.showMessage = true;
            })
            .catch((err) => {
                console.error(err);
                this.getNotes();
            });
        },
        editNote(note){
            this.editForm = note;
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
            this.showMessage = true;
        })
        .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
            this.getNotes();
        });
    },
    // Handle Delete Button
    deleteNote(note) {
        this.removeNote(note.id);
    },
    },
    created(){
        this.getNotes();
    }
};
</script>
