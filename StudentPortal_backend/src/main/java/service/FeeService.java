package service;

import org.springframework.stereotype.Service;

import model.Fee;
import repository.FeeRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class FeeService {

    private final FeeRepository repository;

    public FeeService(FeeRepository repository) {
        this.repository = repository;
    }

    public List<Fee> getAllFees() {
        return repository.findAll();
    }

    public Fee addFee(Fee fee) {
        return repository.save(fee);
    }

    public Fee updateFee(Fee fee) {
        return repository.save(fee);
    }

    public void deleteFee(Long id) {
        repository.deleteById(id);
    }

    public List<Fee> getStudentFees(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public Fee payFee(Long feeId, Double amount) {
        Fee fee = repository.findById(feeId).orElse(null);
        if (fee != null) {
            double newPaidAmount = fee.getPaidAmount() + amount;
            fee.setPaidAmount(newPaidAmount);
            
            if (newPaidAmount >= fee.getAmount()) {
                fee.setStatus("PAID");
                fee.setPaidDate(LocalDate.now());
            } else {
                fee.setStatus("PARTIAL");
            }
            
            return repository.save(fee);
        }
        return null;
    }

    public Map<String, Object> getStudentFeesSummary(Long studentId) {
        List<Fee> fees = repository.findByStudentId(studentId);
        
        double totalAmount = fees.stream().mapToDouble(Fee::getAmount).sum();
        double totalPaid = fees.stream().mapToDouble(Fee::getPaidAmount).sum();
        double totalDue = totalAmount - totalPaid;
        
        long pendingCount = fees.stream().filter(f -> "PENDING".equals(f.getStatus())).count();
        long paidCount = fees.stream().filter(f -> "PAID".equals(f.getStatus())).count();
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalAmount", totalAmount);
        summary.put("totalPaid", totalPaid);
        summary.put("totalDue", totalDue);
        summary.put("pendingCount", pendingCount);
        summary.put("paidCount", paidCount);
        summary.put("fees", fees);
        
        return summary;
    }

    public List<Fee> getPendingFees() {
        return repository.findByStatus("PENDING");
    }

    public Map<String, Object> getOverallFeeStats() {
        List<Fee> allFees = repository.findAll();
        
        double totalAmount = allFees.stream().mapToDouble(Fee::getAmount).sum();
        double totalPaid = allFees.stream().mapToDouble(Fee::getPaidAmount).sum();
        double totalDue = totalAmount - totalPaid;
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAmount", totalAmount);
        stats.put("totalPaid", totalPaid);
        stats.put("totalDue", totalDue);
        stats.put("totalFees", allFees.size());
        
        return stats;
    }
}