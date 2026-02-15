package controller;

import org.springframework.web.bind.annotation.*;

import model.Fee;
import service.FeeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "http://localhost:3000")
public class FeeController {

    private final FeeService service;

    public FeeController(FeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Fee> getAllFees() {
        return service.getAllFees();
    }

    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {
        return service.addFee(fee);
    }

    @PutMapping("/{id}")
    public Fee updateFee(@PathVariable Long id, @RequestBody Fee fee) {
        fee.setId(id);
        return service.updateFee(fee);
    }

    @DeleteMapping("/{id}")
    public void deleteFee(@PathVariable Long id) {
        service.deleteFee(id);
    }

    @GetMapping("/student/{studentId}")
    public List<Fee> getStudentFees(@PathVariable Long studentId) {
        return service.getStudentFees(studentId);
    }

    @PostMapping("/pay/{feeId}")
    public Fee payFee(@PathVariable Long feeId, @RequestBody Map<String, Double> payment) {
        Double amount = payment.get("amount");
        return service.payFee(feeId, amount);
    }

    @GetMapping("/summary/{studentId}")
    public Map<String, Object> getStudentFeesSummary(@PathVariable Long studentId) {
        return service.getStudentFeesSummary(studentId);
    }

    @GetMapping("/pending")
    public List<Fee> getPendingFees() {
        return service.getPendingFees();
    }

    @GetMapping("/stats")
    public Map<String, Object> getOverallFeeStats() {
        return service.getOverallFeeStats();
    }
}