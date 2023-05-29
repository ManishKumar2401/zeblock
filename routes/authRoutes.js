const { Router } = require("express");
const authController = require("../authController/authController");
const { requireAuth, adminAccessAuth } = require("../middleWare/middleWare");
const router = Router();

// working routes //
router.post("/login", authController.login_post);
router.post("/add-task", requireAuth, authController.add_task);
router.post("/taskList", authController.taskList);
router.post("/change-status", authController.change_status);

module.exports = router;
