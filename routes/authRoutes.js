const { Router } = require("express");
const authController = require("../authController/authController");
const { requireAuth, adminAccessAuth } = require("../middleWare/middleWare");
const router = Router();

// working routes //
router.post("/login", authController.login_post);
router.post("/add-task", requireAuth, authController.add_task);
router.post("/edit-task", requireAuth, authController.edit_task);
router.post("/taskList", authController.taskList);
router.post("/change-status", authController.change_status);
router.post("/delete-completed", authController.delete_completed);
router.post("/delete-task", authController.delete_task);
router.post("/undon-delete", authController.undon_delete);

module.exports = router;
